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
  AuthorizerVerifyOtp,
} from './components';
import { Message } from './components/message.component';
import { PasswordStrengthIndicator } from './components/password-strength-indicator';
import { AuthorizerContextService } from './authorizer-context.service';
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
    AuthorizerVerifyOtp,
    Message,
    PasswordStrengthIndicator,
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
    AuthorizerVerifyOtp,
  ],
  providers: [AuthorizerContextService],
})
export class AuthorizerModule {}
