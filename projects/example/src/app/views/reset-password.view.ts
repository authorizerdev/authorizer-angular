import { Component } from '@angular/core';

@Component({
  selector: 'reset-password-view',
  template: `<h1 style="text-align: center;">Reset Password</h1>
    <br /><authorizer-reset-password></authorizer-reset-password>`,
  styles: [],
})
export class ResetPasswordView {
  constructor() {}
}
