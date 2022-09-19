import { Component, Input, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthorizerContextService } from '../authorizer-context.service';
import { ButtonAppearance, MessageType, Views } from '../constants';
import { createOtpValidator } from '../customValidators';

@Component({
  selector: 'authorizer-verify-otp',
  template: `
    <ng-container *ngIf="componentState['successMessage']">
      <message
        [type]="messageType.Success"
        [text]="componentState['successMessage']"
        [showClose]="true"
        (onClose)="onCloseHandler($event)"
      ></message>
    </ng-container>
    <ng-container *ngIf="componentState['error']">
      <message
        [type]="messageType.Error"
        [text]="componentState['error']"
        [showClose]="true"
        (onClose)="onCloseHandler($event)"
      ></message>
    </ng-container>
    <p style="text-align: center; margin: 10px 0px;">
      Please enter the OTP you received on your email address.
    </p>
    <br />
    <form [formGroup]="otpForm" (ngSubmit)="onSubmit()">
      <div class="styled-form-group">
        <label for="otp" class="form-input-label"
          ><span> * </span>OTP (One Time Password)
        </label>
        <input
          id="otp"
          type="text"
          formControlName="otp"
          placeholder="eg. AB123C"
          class="form-input-field {{(otp?.errors?.['required'] || otp?.errors?.['invalidFormat']) && (otp?.dirty) && 'input-error-content'}}"
        />
        <div
          *ngIf="otp?.errors?.['required'] && (otp?.dirty)"
          class="form-input-error"
        >
          OTP is required
        </div>
        <div
          *ngIf="otp?.errors?.['invalidFormat'] && (otp?.dirty)"
          class="form-input-error"
        >
          Please enter valid OTP
        </div>
      </div>
      <br />
      <styled-button
        [appearance]="buttonAppearance.Primary"
        [disabled]="componentState['loading'] || !otpForm.valid"
      >
        <ng-container *ngIf="componentState['loading']; else submit_otp">
          Processing ...
        </ng-container>
        <ng-template #submit_otp> Submit </ng-template>
      </styled-button>
    </form>
    <styled-footer>
      <div
        style="margin-bottom: 10px;"
        *ngIf="componentState['sendingOtp']; else other_content"
      >
        Sending ...
      </div>
      <ng-template #other_content>
        <styled-link (click)="resendOtp()" marginBottom="10px">
          Resend OTP
        </styled-link>
      </ng-template>
      <ng-container *ngIf="state['config'].is_sign_up_enabled">
        <styled-flex>
          Don't have an account?&nbsp;
          <styled-link (click)="setView(views.Signup)">Sign Up</styled-link>
        </styled-flex>
      </ng-container>
    </styled-footer>
  `,
  styleUrls: ['../styles/input-form.styles.css'],
})
export class AuthorizerVerifyOtp {
  @Input() onLogin: any;
  @Input() email: string = '';
  @Input() changeViewEventEmitter?: EventEmitter<string>;

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
    sendingOtp: false,
  };

  otpForm = new FormGroup({
    otp: new FormControl(null, [Validators.required, createOtpValidator()]),
  });

  get otp() {
    return this.otpForm.get('otp');
  }

  onCloseHandler(stateKey: string) {
    this.componentState[stateKey] = null;
  }

  setView(value: string) {
    if (this.changeViewEventEmitter) {
      this.changeViewEventEmitter.emit(value);
    }
  }

  async resendOtp() {
    this.componentState['successMessage'] = null;
    try {
      this.componentState['sendingOtp'] = true;
      const res = await this.state['authorizerRef'].resendOtp({
        email: this.email,
      });
      this.componentState['sendingOtp'] = false;
      if (res && res?.message) {
        this.componentState['error'] = null;
        this.componentState['successMessage'] = res.message;
      }
      if (this.onLogin) {
        this.onLogin(res);
      }
    } catch (error: any) {
      this.componentState['loading'] = false;
      this.componentState['error'] = error.message;
    }
  }

  async onSubmit() {
    this.componentState['successMessage'] = null;
    try {
      this.componentState['loading'] = true;
      const res = await this.state['authorizerRef'].verifyOtp({
        email: this.email,
        otp: this.otp?.value,
      });
      this.componentState['loading'] = false;
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
