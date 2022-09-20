import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorizerContextService } from '../authorizer-context.service';
import { Views, MessageType, ButtonAppearance } from '../constants';
import { createEmailValidator } from '../customValidators';
import { passwordMatchingValidatior } from '../customValidators/password-matching.validator';

@Component({
  selector: 'authorizer-signup',
  template: `
    <ng-container
      *ngIf="componentState['successMessage']; else magic_link_login_form"
    >
      <message
        [type]="messageType.Success"
        [text]="componentState['successMessage']"
      ></message>
    </ng-container>
    <ng-template #magic_link_login_form>
      <ng-container *ngIf="componentState['error']">
        <message
          [type]="messageType.Error"
          [text]="componentState['error']"
          [showClose]="true"
          (onClose)="onCloseHandler($event)"
        ></message>
      </ng-container>
      <form [formGroup]="signupForm" (ngSubmit)="onSubmit()">
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
            class="form-input-field {{(password?.errors?.['required'] || signupForm.errors?.['notmatched']) && (password?.dirty) && 'input-error-content'}}"
          />
          <div
            *ngIf="password?.errors?.['required'] && (password?.dirty)"
            class="form-input-error"
          >
            Password is required
          </div>
          <div
            *ngIf="signupForm.errors?.['notmatched']"
            class="form-input-error"
          >
            Password and confirm passwords don't match
          </div>
        </div>
        <div class="styled-form-group">
          <label for="confirmPassword" class="form-input-label"
            ><span> * </span>Confirm Password
          </label>
          <input
            id="confirmPassword"
            type="password"
            formControlName="confirmPassword"
            placeholder="********"
            class="form-input-field {{(confirmPassword?.errors?.['required'] || signupForm.errors?.['notmatched']) && (confirmPassword?.dirty) && 'input-error-content'}}"
          />
          <div
            *ngIf="confirmPassword?.errors?.['required'] && (confirmPassword?.dirty)"
            class="form-input-error"
          >
            Confirm Password is required
          </div>
          <div
            *ngIf="signupForm.errors?.['notmatched']"
            class="form-input-error"
          >
            Password and confirm passwords don't match
          </div>
        </div>
        <ng-container *ngIf="state['config'].is_strong_password_enabled">
          <password-strength-indicator></password-strength-indicator>
          <br />
        </ng-container>
        <styled-button
          [appearance]="buttonAppearance.Primary"
          [disabled]="componentState['loading'] || !signupForm.valid"
        >
          <ng-container *ngIf="componentState['loading']; else signup_text">
            Processing ...
          </ng-container>
          <ng-template #signup_text> Sign Up </ng-template>
        </styled-button>
      </form>
      <styled-footer>
        <styled-flex>
          Already have an account?&nbsp;
          <styled-link (click)="setView(views.Login)">Log In</styled-link>
        </styled-flex>
      </styled-footer>
    </ng-template>
  `,
  styleUrls: ['../styles/input-form.styles.css'],
})
export class AuthorizerSignup {
  @Input() onSignup: any;
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
    error: null,
    successMessage: null,
    loading: false,
    disableSignupButton: false,
  };

  signupForm = new FormGroup(
    {
      email: new FormControl(null, [
        Validators.required,
        createEmailValidator(),
      ]),
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    },
    { validators: passwordMatchingValidatior }
  );

  get email() {
    return this.signupForm.get('email');
  }

  get password() {
    return this.signupForm.get('password');
  }

  get confirmPassword() {
    return this.signupForm.get('confirmPassword');
  }

  onCloseHandler(stateKey: string) {
    this.componentState[stateKey] = null;
  }

  setView(view: string) {
    this.changeView.emit(view);
  }

  setDisableButton(value: boolean) {
    this.componentState['disableSignupButton'] = value;
  }

  async onSubmit() {
    try {
      this.componentState['loading'] = true;
      const data: any = {
        email: this.email?.value,
        password: this.password?.value,
        confirm_password: this.confirmPassword?.value,
      };
      if (this.urlProps.scope) {
        data.scope = this.urlProps.scope;
      }
      if (this.urlProps.redirect_uri) {
        data.redirect_uri = this.urlProps.redirect_uri;
      }
      const res = await this.state['authorizerRef'].signup(data);
      if (res) {
        this.componentState['error'] = null;
        if (res.access_token) {
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
        } else {
          this.componentState['error'] = null;
          this.componentState['successMessage'] = res?.message
            ? res.message
            : null;
        }
        if (this.onSignup) {
          this.onSignup(res);
        }
      }
    } catch (error: any) {
      this.componentState['loading'] = false;
      this.componentState['error'] = error.message;
    }
  }
}
