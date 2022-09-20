import { Component, Input } from '@angular/core';
import { ButtonAppearance, MessageType } from '../constants';
import { AuthorizerContextService } from '../authorizer-context.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { createEmailValidator } from '../customValidators';

@Component({
  selector: 'authorizer-magic-link-login',
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
      <form [formGroup]="magicLinkLoginForm" (ngSubmit)="onSubmit()">
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
          [disabled]="componentState['loading'] || !magicLinkLoginForm.valid"
        >
          <ng-container *ngIf="componentState['loading']; else button_text">
            Processing ...
          </ng-container>
          <ng-template #button_text> Send Email </ng-template>
        </styled-button>
      </form>
    </ng-template>
  `,
  styleUrls: ['../styles/input-form.styles.css'],
})
export class AuthorizerMagicLinkLogin {
  @Input() onMagicLinkLogin: any;
  @Input() urlProps: any = {};

  constructor(private contextService: AuthorizerContextService) {
    contextService.getState().subscribe((state) => {
      this.state = state;
    });
  }

  state: Record<string, any> = {};
  messageType: any = MessageType;
  buttonAppearance: any = ButtonAppearance;
  componentState: Record<string, any> = {
    error: null,
    successMessage: null,
    loading: false,
  };

  magicLinkLoginForm = new FormGroup({
    email: new FormControl(null, [Validators.required, createEmailValidator()]),
  });

  get email() {
    return this.magicLinkLoginForm.get('email');
  }

  onCloseHandler(stateKey: string) {
    this.componentState[stateKey] = null;
  }

  async onSubmit() {
    try {
      this.componentState['loading'] = true;
      const res = await this.state['authorizerRef'].magicLinkLogin({
        email: this.email?.value,
        state: this.urlProps.state || '',
        redirect_uri: this.urlProps.redirect_uri || '',
      });
      this.componentState['loading'] = false;
      if (res) {
        this.componentState['error'] = null;
        this.componentState['successMessage'] = res.message || ``;
        if (this.onMagicLinkLogin) {
          this.onMagicLinkLogin(res);
        }
      }
      if (this.urlProps.redirect_uri) {
        setTimeout(() => {
          window.location.replace(this.urlProps.redirect_uri);
        }, 3000);
      }
    } catch (error: any) {
      this.componentState['loading'] = false;
      this.componentState['error'] = error.message;
    }
  }
}
