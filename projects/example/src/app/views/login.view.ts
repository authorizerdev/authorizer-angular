import { Component } from '@angular/core';
import { AuthorizerContextService } from 'authorizer-angular';

@Component({
  selector: 'login-view',
  template: `<div class="login-container">
    <h1>Welcome to Authorizer</h1>
    <br /><authorizer></authorizer>
  </div>`,
  styles: [
    `
      .login-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }
    `,
  ],
})
export class LoginView {
  constructor(public contextService: AuthorizerContextService) {
    contextService.getState().subscribe((state) => {
      if (state.token) {
        window.location.assign('/dashboard');
      }
    });
  }
}
