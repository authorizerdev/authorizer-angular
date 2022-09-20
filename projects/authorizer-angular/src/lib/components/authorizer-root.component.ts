import { Component, OnInit, Input } from '@angular/core';
import { AuthorizerContextService } from '../authorizer-context.service';
import { Views } from '../constants';
import { createRandomString } from '../utils/common';
import { hasWindow } from '../utils/window';

@Component({
  selector: 'authorizer',
  template: `
    <styled-wrapper>
      <authorizer-social-login [urlProps]="urlProps"></authorizer-social-login>
      <authorizer-basic-auth-login
        *ngIf="
          view === views.Login &&
          state['config'].is_basic_authentication_enabled &&
          !state['config'].is_magic_link_login_enabled
        "
        [onLogin]="onLogin"
        [urlProps]="urlProps"
        (changeView)="setView($event)"
      ></authorizer-basic-auth-login>
      <authorizer-signup
        *ngIf="
          view === views.Signup &&
          state['config'].is_basic_authentication_enabled &&
          !state['config'].is_magic_link_login_enabled &&
          state['config'].is_sign_up_enabled
        "
        [onSignup]="onSignup"
        [urlProps]="urlProps"
        (changeView)="setView($event)"
      ></authorizer-signup>
      <authorizer-magic-link-login
        *ngIf="
          view === views.Login && state['config'].is_magic_link_login_enabled
        "
        [onMagicLinkLogin]="onMagicLinkLogin"
        [urlProps]="urlProps"
      ></authorizer-magic-link-login>
      <authorizer-forgot-password
        *ngIf="view === views.ForgotPassword"
        [onForgotPassword]="onForgotPassword"
        [urlProps]="urlProps"
        (changeView)="setView($event)"
      ></authorizer-forgot-password>
    </styled-wrapper>
  `,
  styles: [],
})
export class AuthorizerRoot implements OnInit {
  @Input() onLogin: any;
  @Input() onSignup: any;
  @Input() onMagicLinkLogin: any;
  @Input() onForgotPassword: any;

  constructor(private contextService: AuthorizerContextService) {
    contextService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  state: Record<string, any> = {};
  view: string = Views.Login;
  urlProps: Record<string, any> = {};
  views: any = Views;

  setView(viewType: string) {
    if (viewType) this.view = viewType;
  }

  ngOnInit(): void {
    const searchParams = new URLSearchParams(
      hasWindow() ? window.location.search : ``
    );
    const paramsState = searchParams.get('state') || createRandomString();
    const scope = searchParams.get('scope')
      ? searchParams.get('scope')?.toString().split(' ')
      : ['openid', 'profile', 'email'];
    const urlProps: any = {
      state: paramsState,
      scope,
    };
    const redirectURL =
      searchParams.get('redirect_uri') || searchParams.get('redirectURL');
    if (redirectURL) {
      urlProps.redirectURL = redirectURL;
    } else {
      urlProps.redirectURL = hasWindow() ? window.location.origin : redirectURL;
    }
    urlProps.redirect_uri = urlProps.redirectURL;
    this.urlProps = urlProps;
  }
}
