import { NgModule } from '@angular/core';
import { AuthorizerProvider } from './authorizer-provider.component';
import { AuthorizerBasicAuthLogin } from './authorizer-basic-auth-login.component';
import { AuthorizerForgotPassword } from './authorizer-forgot-password.component';

@NgModule({
  declarations: [
    AuthorizerProvider,
    AuthorizerBasicAuthLogin,
    AuthorizerForgotPassword,
  ],
  imports: [],
  exports: [
    AuthorizerProvider,
    AuthorizerBasicAuthLogin,
    AuthorizerForgotPassword,
  ],
})
export class AuthorizerModule {}
