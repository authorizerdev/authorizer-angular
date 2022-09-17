import { Component } from '@angular/core';

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
  constructor() {}
}
