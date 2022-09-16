import { NgModule } from '@angular/core';
import {
  AuthorizerProvider,
  AuthorizerBasicAuthLogin,
  AuthorizerForgotPassword,
} from './components';
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
