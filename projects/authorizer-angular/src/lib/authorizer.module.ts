import { NgModule } from '@angular/core';
import { AuthorizerProvider } from './authorizer-provider.component';
import { AuthorizerBasicAuthLogin } from './authorizer-basic-auth-login.component';

@NgModule({
  declarations: [AuthorizerProvider, AuthorizerBasicAuthLogin],
  imports: [],
  exports: [AuthorizerProvider, AuthorizerBasicAuthLogin],
})
export class AuthorizerModule {}
