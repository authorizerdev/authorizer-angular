import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ButtonAppearance, MessageType, Views } from '../constants';
import { AuthorizerContextService } from '../authorizer-context.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { createEmailValidator } from '../customValidators';

@Component({
  selector: 'authorizer-forgot-password',
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
      <p style="text-align: center; margin: 10px 0px;">
        Please enter your email address.
        <br />
        We will send you an email to reset your password.
      </p>
      <br />
      <form [formGroup]="forgotPasswordForm" (ngSubmit)="onSubmit()">
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
        <br />
        <styled-button
          [appearance]="buttonAppearance.Primary"
          [disabled]="componentState['loading'] || !forgotPasswordForm.valid"
        >
          <ng-container *ngIf="componentState['loading']; else button_text">
            Processing ...
          </ng-container>
          <ng-template #button_text> Send Email </ng-template>
        </styled-button>
      </form>
      <styled-footer>
        <styled-flex>
          Remember your password?&nbsp;
          <styled-link (click)="setView(views.Login)">Log In</styled-link>
        </styled-flex>
      </styled-footer>
    </ng-template>
  `,
  styleUrls: ['../styles/input-form.styles.css'],
})
export class AuthorizerForgotPassword {
  @Input() onForgotPassword: any;
  @Input() urlProps: any = {};

  @Output() changeView = new EventEmitter<string>();

  constructor(private contextService: AuthorizerContextService) {
    contextService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  state: Record<string, any> = {};
  messageType: any = MessageType;
  buttonAppearance: any = ButtonAppearance;
  views: any = Views;
  componentState: Record<string, any> = {
    error: null,
    successMessage: null,
    loading: false,
  };

  forgotPasswordForm = new FormGroup({
    email: new FormControl(null, [Validators.required, createEmailValidator()]),
  });

  get email() {
    return this.forgotPasswordForm.get('email');
  }

  onCloseHandler(stateKey: string) {
    this.componentState[stateKey] = null;
  }

  setView(view: string) {
    this.changeView.emit(view);
  }

  async onSubmit() {
    try {
      this.componentState['loading'] = true;
      const res = await this.state['authorizerRef'].forgotPassword({
        email: this.email?.value,
        state: this.urlProps.state || '',
        redirect_uri:
          this.urlProps.redirect_uri ||
          this.state['config'].redirectURL ||
          window.location.origin,
      });
      this.componentState['loading'] = false;
      if (res && res.message) {
        this.componentState['error'] = null;
        this.componentState['successMessage'] = res.message;
      }
      if (this.onForgotPassword) {
        this.onForgotPassword(res);
      }
    } catch (error: any) {
      this.componentState['loading'] = false;
      this.componentState['error'] = error.message;
    }
  }
}
