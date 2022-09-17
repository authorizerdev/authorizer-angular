import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Authorizer } from '@authorizerdev/authorizer-js';
import { AuthorizerContextService } from '../authorizer-context.service';
import { AuthorizerProviderActionType } from '../constants';
import { hasWindow } from '../utils/window';

@Component({
  selector: 'authorizer-provider',
  template: `<ng-content></ng-content>`,
  styles: [],
})
export class AuthorizerProvider implements OnInit, OnChanges {
  @Input() config: Record<string, any> = {};
  @Input() onStateChangeCallback?: Function;

  constructor(private contextService: AuthorizerContextService) {
    contextService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  state: Record<string, any> = {};

  dispatch({ type, payload }: { type: string; payload: any }) {
    switch (type) {
      case AuthorizerProviderActionType.SET_USER:
        this.contextService.setState({ ...this.state, user: payload.user });
        break;
      case AuthorizerProviderActionType.SET_TOKEN:
        this.contextService.setState({ ...this.state, token: payload.token });
        break;
      case AuthorizerProviderActionType.SET_LOADING:
        this.contextService.setState({
          ...this.state,
          loading: payload.loading,
        });
        break;
      case AuthorizerProviderActionType.SET_CONFIG:
        this.contextService.setState({
          ...this.state,
          config: { ...this.state['config'], ...payload.config },
        });
        break;
      case AuthorizerProviderActionType.SET_AUTH_DATA:
        this.contextService.setState({
          ...this.state,
          ...payload,
          config: { ...this.state['config'], ...payload.config },
        });
        break;
      default:
        throw new Error();
    }
  }

  intervalRef: any = null;

  async getToken() {
    const metaRes = await this.state['authorizerRef'].getMetaData();
    try {
      const res = await this.state['authorizerRef'].getSession();
      if (res.access_token && res.user) {
        const token = {
          access_token: res.access_token,
          expires_in: res.expires_in,
          id_token: res.id_token,
          refresh_token: res.refresh_token || '',
        };
        this.dispatch({
          type: AuthorizerProviderActionType.SET_AUTH_DATA,
          payload: {
            token,
            user: res.user,
            config: metaRes,
            loading: false,
          },
        });
        if (this.intervalRef) clearInterval(this.intervalRef);
        this.intervalRef = setInterval(() => {
          this.getToken();
        }, res.expires_in * 1000);
      } else {
        this.dispatch({
          type: AuthorizerProviderActionType.SET_AUTH_DATA,
          payload: {
            token: null,
            user: null,
            config: metaRes,
            loading: false,
          },
        });
      }
    } catch (error) {
      this.dispatch({
        type: AuthorizerProviderActionType.SET_AUTH_DATA,
        payload: {
          token: null,
          user: null,
          config: metaRes,
          loading: false,
        },
      });
    }
  }

  ngOnInit(): void {
    this.getToken();
    this.contextService.setState({
      ...this.state,
      config: { ...this.state['config'], ...this.config },
      authorizerRef: new Authorizer({
        authorizerURL: this.config?.['authorizerURL'] || '',
        redirectURL: this.config?.['redirectURL']
          ? this.config['redirectURL']
          : hasWindow()
          ? window.location.origin
          : '/',
        clientID: this.config?.['client_id'] || '',
      }),
      setToken: (token: any) => {
        this.dispatch({
          type: AuthorizerProviderActionType.SET_TOKEN,
          payload: {
            token,
          },
        });
        if (token?.access_token) {
          if (this.intervalRef) clearInterval(this.intervalRef);
          this.intervalRef = setInterval(() => {
            this.getToken();
          }, token.expires_in * 1000);
        }
      },
      setAuthData: (data: any) => {
        this.dispatch({
          type: AuthorizerProviderActionType.SET_AUTH_DATA,
          payload: data,
        });
        if (data.token?.access_token) {
          if (this.intervalRef) clearInterval(this.intervalRef);
          this.intervalRef = setInterval(() => {
            this.getToken();
          }, data.token.expires_in * 1000);
        }
      },
      setUser: (user: any) => {
        this.dispatch({
          type: AuthorizerProviderActionType.SET_USER,
          payload: {
            user,
          },
        });
      },
      setLoading: (loading: boolean) => {
        this.dispatch({
          type: AuthorizerProviderActionType.SET_LOADING,
          payload: {
            loading,
          },
        });
      },
      logout: async () => {
        this.dispatch({
          type: AuthorizerProviderActionType.SET_LOADING,
          payload: {
            loading: true,
          },
        });
        await this.state['authorizerRef'].logout();
        const loggedOutState = {
          user: null,
          token: null,
          loading: false,
          config: this.state['config'],
        };
        this.dispatch({
          type: AuthorizerProviderActionType.SET_AUTH_DATA,
          payload: loggedOutState,
        });
      },
    });
  }

  ngOnChanges(state: any): void {
    if (JSON.stringify(this.state) !== '{}' && this.onStateChangeCallback) {
      this.onStateChangeCallback(this.state);
    }
  }
}
