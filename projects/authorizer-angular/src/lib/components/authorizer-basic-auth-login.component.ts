import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthorizerContextService } from '../authorizer-context.service';
import { ButtonAppearance, MessageType, Views } from '../constants';

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
        <form [formGroup]="loginForm">
          <div class="styled-form-group">
            <label for="email" class="form-input-label"
              ><span> * </span>Email
            </label>
            <input
              id="email"
              type="text"
              formControlName="email"
              placeholder="eg. foo@bar.com"
              class="form-input-field {{email?.errors?.['required'] && (email?.dirty) && 'input-error-content'}}"
            />
            <div
              *ngIf="email?.errors?.['required'] && (email?.dirty)"
              class="form-input-error"
            >
              Email is required.
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
              Password is required.
            </div>
          </div>
          <br />
          <styled-button
            [appearance]="buttonAppearance.Primary"
            [disabled]="
              componentState['loading'] ||
              !email?.value ||
              !password?.value ||
              email?.errors ||
              password?.errors
            "
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
  styles: [
    `
      .styled-form-group {
        width: 100%;
        border: 0px;
        background-color: var(--white-color);
        padding: 0 0 15px;
      }
      .form-input-label {
        padding: 2.5px;
      }
      .form-input-label > span {
        color: var(--danger-color);
      }
      .form-input-field {
        width: 100%;
        margin-top: 5px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        border-radius: var(--radius-input);
        border: 1px;
        border-style: solid;
        border-color: var(--text-color);
      }
      .input-error-content {
        border-color: var(--danger-color) !important;
      }
      .input-error-content:hover {
        outline-color: var(--danger-color);
      }
      .input-error-content:focus {
        outline-color: var(--danger-color);
      }
      .form-input-error {
        font-size: 12px;
        font-weight: 400;
        color: red;
        border-color: var(--danger-color);
      }
    `,
  ],
})
export class AuthorizerBasicAuthLogin implements OnInit {
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
    email: new FormControl(null, [Validators.required]),
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

  ngOnInit(): void {}
}
