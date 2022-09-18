import { Component, Input, OnInit } from '@angular/core';
import { AuthorizerContextService } from '../authorizer-context.service';
import { createQueryParams } from '../utils/common';

@Component({
  selector: 'authorizer-social-login',
  template: `
    <div>
      <div *ngIf="state['config'].is_apple_login_enabled" id="appleid-signin">
        <styled-button (click)="buttonClickHandler('apple')">
          <apple></apple>
          Sign in with Apple
        </styled-button>
        <br />
      </div>
      <ng-container *ngIf="state['config'].is_google_login_enabled">
        <styled-button (click)="buttonClickHandler('google')">
          <google></google>
          Sign in with Google
        </styled-button>
        <br />
      </ng-container>
      <ng-container *ngIf="state['config'].is_github_login_enabled">
        <styled-button (click)="buttonClickHandler('github')">
          <github></github>
          Sign in with Github
        </styled-button>
        <br />
      </ng-container>
      <ng-container *ngIf="state['config'].is_facebook_login_enabled">
        <styled-button (click)="buttonClickHandler('facebook')">
          <facebook></facebook>
          Sign in with Facebook
        </styled-button>
        <br />
      </ng-container>
      <ng-container *ngIf="state['config'].is_linkedin_login_enabled">
        <styled-button (click)="buttonClickHandler('linkedin')">
          <linkedin></linkedin>
          Sign in with Linkedin
        </styled-button>
        <br />
      </ng-container>
      <ng-container *ngIf="state['config'].is_twitter_login_enabled">
        <styled-button (click)="buttonClickHandler('twitter')">
          <twitter></twitter>
          Sign in with Twitter
        </styled-button>
        <br />
      </ng-container>
      <styled-separator
        *ngIf="
          hasSocialLogin &&
          (state['config'].is_basic_authentication_enabled ||
            state['config'].is_magic_link_login_enabled)
        "
      >
        OR
      </styled-separator>
    </div>
  `,
  styles: [],
})
export class AuthorizerSocialLogin implements OnInit {
  @Input() urlProps: any = {
    scope: [],
  };

  constructor(private contextService: AuthorizerContextService) {
    contextService.getState().subscribe((state) => {
      this.state = state;
      this.hasSocialLogin =
        state['config'].is_google_login_enabled ||
        state['config'].is_github_login_enabled ||
        state['config'].is_facebook_login_enabled ||
        state['config'].is_linkedin_login_enabled ||
        state['config'].is_apple_login_enabled ||
        state['config'].is_twitter_login_enabled;
    });
  }

  state: Record<string, any> = {};
  hasSocialLogin: boolean = false;
  queryParams: any;

  buttonClickHandler(buttonType: string) {
    switch (buttonType) {
      case 'apple':
        if (window?.location)
          window.location.href = `${this.state['config'].authorizerURL}/oauth_login/apple?${this.queryParams}`;
        break;
      case 'google':
        if (window?.location)
          window.location.href = `${this.state['config'].authorizerURL}/oauth_login/google?${this.queryParams}`;
        break;
      case 'github':
        if (window?.location)
          window.location.href = `${this.state['config'].authorizerURL}/oauth_login/github?${this.queryParams}`;
        break;
      case 'facebook':
        if (window?.location)
          window.location.href = `${this.state['config'].authorizerURL}/oauth_login/facebook?${this.queryParams}`;
        break;
      case 'linkedin':
        if (window?.location)
          window.location.href = `${this.state['config'].authorizerURL}/oauth_login/linkedin?${this.queryParams}`;
        break;
      case 'twitter':
        if (window?.location)
          window.location.href = `${this.state['config'].authorizerURL}/oauth_login/twitter?${this.queryParams}`;
        break;
      default:
        break;
    }
  }

  ngOnInit() {
    this.queryParams = createQueryParams({
      ...this.urlProps,
      scope: this.urlProps.scope.join(' '),
    });
  }
}
