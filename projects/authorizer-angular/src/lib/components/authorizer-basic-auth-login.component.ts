import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizerContextService } from '../authorizer-context.service';
import { ButtonAppearance, MessageType, Views } from '../constants';
import { createEmailValidator } from '../customValidators';

@Component({
  selector: 'authorizer-basic-auth-login',
  template: `
    <ng-container *ngIf="otpData['isScreenVisible']; else login_form">
      <authorizer-verify-otp
        [onLogin]="onLogin"
        [email]="otpData['email']"
        [changeViewEventEmitter]="changeView"
      ></authorizer-verify-otp>
    </ng-container>
    <ng-template #login_form>
      <div>
        <ng-container *ngIf="componentState['error']">
          <message
            [type]="messageType.Error"
            [text]="componentState['error']"
            [showClose]="true"
            (onClose)="onCloseHandler($event)"
          ></message>
        </ng-container>
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          <div class="styled-form-group">
            <label for="email" class="form-input-label"
              ><span> * </span>Email
            </label>
            <input
              id="email"
              type="text"
              formControlName="email"
              placeholder="eg. foo@bar.com"
              class="form-input-field {{(email?.errors?.['required'] || email?.errors?.['invalidFormat']) && (email?.dirty) && 'input-error-content'}}"
            />
            <div
              *ngIf="email?.errors?.['required'] && (email?.dirty)"
              class="form-input-error"
            >
              Email is required
            </div>
            <div
              *ngIf="email?.errors?.['invalidFormat'] && (email?.dirty)"
              class="form-input-error"
            >
              Please enter valid email
            </div>
          </div>
          <div class="styled-form-group">
            <label for="password" class="form-input-label"
              ><span> * </span>Password
            </label>
            <input
              id="password"
              type="password"
              formControlName="password"
              placeholder="********"
              class="form-input-field {{password?.errors?.['required'] && (password?.dirty) && 'input-error-content'}}"
            />
            <div
              *ngIf="password?.errors?.['required'] && (password?.dirty)"
              class="form-input-error"
            >
              Password is required
            </div>
          </div>
          <br />
          <styled-button
            [appearance]="buttonAppearance.Primary"
            [disabled]="componentState['loading'] || !loginForm.valid"
          >
            <ng-container *ngIf="componentState['loading']; else login_text">
              Processing ...
            </ng-container>
            <ng-template #login_text> Log In </ng-template>
          </styled-button>
        </form>
        <styled-footer>
          <styled-link
            (click)="setView(views.ForgotPassword)"
            marginBottom="10px"
          >
            Forgot Password?
          </styled-link>
          <ng-container *ngIf="state['config'].is_sign_up_enabled">
            <styled-flex>
              Don't have an account?&nbsp;
              <styled-link (click)="setView(views.Signup)">Sign Up</styled-link>
            </styled-flex>
          </ng-container>
        </styled-footer>
      </div>
    </ng-template>
  `,
  styleUrls: ['../styles/input-form.styles.css'],
})
export class AuthorizerBasicAuthLogin {
  @Input() onLogin: any;
  @Input() urlProps: any = {};

  @Output() changeView = new EventEmitter<string>();

  constructor(private contextService: AuthorizerContextService) {
    contextService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  views: any = Views;
  state: Record<string, any> = {};
  messageType: any = MessageType;
  buttonAppearance: any = ButtonAppearance;
  componentState: Record<string, any> = {
    loading: false,
    error: null,
  };
  otpData: Record<string, any> = {
    isScreenVisible: false,
    email: null,
  };

  loginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, createEmailValidator()]),
    password: new FormControl(null, [Validators.required]),
  });

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  onCloseHandler(stateKey: string) {
    this.componentState[stateKey] = null;
  }

  setView(view: string) {
    this.changeView.emit(view);
  }

  async onSubmit() {
    this.componentState['loading'] = true;
    try {
      const data: any = {
        email: this.email?.value,
        password: this.password?.value,
      };
      if (this.urlProps.scope) {
        data.scope = this.urlProps.scope;
      }
      const res = await this.state['authorizerRef'].login(data);
      if (res && res?.should_show_otp_screen) {
        this.otpData = {
          isScreenVisible: true,
          email: data.email,
        };
        return;
      }
      if (res) {
        this.componentState['error'] = null;
        this.state['setAuthData']({
          user: res.user || null,
          token: {
            access_token: res.access_token,
            expires_in: res.expires_in,
            refresh_token: res.refresh_token,
            id_token: res.id_token,
          },
          config: this.state['config'],
          loading: false,
        });
      }
      if (this.onLogin) {
        this.onLogin(res);
      }
    } catch (error: any) {
      this.componentState['loading'] = false;
      this.componentState['error'] = error.message;
    }
  }
}
