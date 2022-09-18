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
import { PasswordStrengthIndicator } from './components/password-strength-indicator.component';
import { AuthorizerContextService } from './authorizer-context.service';
import {
  AppleIcon,
  CloseIcon,
  FacebookIcon,
  GithubIcon,
  GoogleIcon,
  LinkedinIcon,
  TwitterIcon,
} from './icons';
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
    AppleIcon,
    CloseIcon,
    FacebookIcon,
    GithubIcon,
    GoogleIcon,
    LinkedinIcon,
    TwitterIcon,
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
