import { Component, OnInit, Input } from '@angular/core';
import { AuthorizerContextService } from '../authorizer-context.service';
import { Views } from '../constants';
import { createRandomString } from '../utils/common';
import { hasWindow } from '../utils/window';

@Component({
  selector: 'authorizer',
  template: `<div style="position: relative;"></div>`,
  styles: [],
})
export class AuthorizerRoot implements OnInit {
  @Input() body: string = 'Authorizer Root Component';

  constructor(private contextService: AuthorizerContextService) {
    contextService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  state: Record<string, any> = {};
  view: string = Views.Login;
  urlProps: Record<string, any> = {};

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
