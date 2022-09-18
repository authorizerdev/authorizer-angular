import { Component, OnInit, Input } from '@angular/core';
import { Authorizer } from '@authorizerdev/authorizer-js';
import { AuthorizerContextService } from '../authorizer-context.service';
import { AuthorizerProviderActionType } from '../constants';
import { hasWindow } from '../utils/window';

@Component({
  selector: 'authorizer-provider',
  template: `<ng-content></ng-content>`,
  styles: [
    `
      :host {
        --primary-color: #3b82f6;
        --primary-disabled-color: #60a5fa;
        --gray-color: #d1d5db;
        --white-color: #ffffff;
        --danger-color: #dc2626;
        --success-color: #10b981;
        --text-color: #374151;
        --fonts-font-stack: -apple-system, system-ui, sans-serif;
        --fonts-large-text: 18px;
        --fonts-medium-text: 14px;
        --fonts-small-text: 12px;
        --fonts-tiny-text: 10px;
        --radius-card: 5px;
        --radius-button: 5px;
        --radius-input: 5px;
      }
    `,
  ],
})
export class AuthorizerProvider implements OnInit {
  @Input() config: Record<string, any> = {};
  @Input() onStateChangeCallback?: Function;

  constructor(private contextService: AuthorizerContextService) {
    contextService.getState().subscribe((state) => {
      this.state = state;
      this.onStateChangeCallback && this.onStateChangeCallback(state);
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
}
