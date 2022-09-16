import { NgModule } from '@angular/core';
import {
  AuthorizerProvider,
  AuthorizerBasicAuthLogin,
  AuthorizerForgotPassword,
  AuthorizerMagicLinkLogin,
  AuthorizerResetPassword,
  AuthorizerRoot,
  AuthorizerSignup,
  AuthorizerSocialLogin,
} from './components';
@NgModule({
  declarations: [
    AuthorizerProvider,
    AuthorizerBasicAuthLogin,
    AuthorizerForgotPassword,
    AuthorizerMagicLinkLogin,
    AuthorizerResetPassword,
    AuthorizerRoot,
    AuthorizerSignup,
    AuthorizerSocialLogin,
  ],
  imports: [],
  exports: [
    AuthorizerProvider,
    AuthorizerBasicAuthLogin,
    AuthorizerForgotPassword,
    AuthorizerMagicLinkLogin,
    AuthorizerResetPassword,
    AuthorizerRoot,
    AuthorizerSignup,
    AuthorizerSocialLogin,
  ],
})
export class AuthorizerModule {}
