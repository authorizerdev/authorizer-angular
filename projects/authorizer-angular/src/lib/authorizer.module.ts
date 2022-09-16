import { NgModule } from '@angular/core';
import {
  AuthorizerProvider,
  AuthorizerBasicAuthLogin,
  AuthorizerForgotPassword,
  AuthorizerMagicLinkLogin,
  AuthorizerResetPassword,
  AuthorizerRoot,
} from './components';
@NgModule({
  declarations: [
    AuthorizerProvider,
    AuthorizerBasicAuthLogin,
    AuthorizerForgotPassword,
    AuthorizerMagicLinkLogin,
    AuthorizerResetPassword,
    AuthorizerRoot,
  ],
  imports: [],
  exports: [
    AuthorizerProvider,
    AuthorizerBasicAuthLogin,
    AuthorizerForgotPassword,
    AuthorizerMagicLinkLogin,
    AuthorizerResetPassword,
    AuthorizerRoot,
  ],
})
export class AuthorizerModule {}
