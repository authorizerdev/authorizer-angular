import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthorizerContextService } from '../authorizer-context.service';
import { ButtonAppearance, MessageType } from '../constants';
import { passwordMatchingValidatior } from '../customValidators/password-matching.validator';

@Component({
  selector: 'authorizer-reset-password',
  template: `
    <styled-wrapper>
      <ng-container *ngIf="componentState['error']">
        <message
          [type]="messageType.Error"
          [text]="componentState['error']"
          [showClose]="true"
          (onClose)="onCloseHandler($event)"
        ></message>
      </ng-container>
      <form [formGroup]="resetPasswordForm" (ngSubmit)="onSubmit()">
        <div class="styled-form-group">
          <label for="password" class="form-input-label"
            ><span> * </span>Password
          </label>
          <input
            id="password"
            type="password"
            formControlName="password"
            placeholder="********"
            class="form-input-field {{(password?.errors?.['required'] || resetPasswordForm.errors?.['notmatched']) && (password?.dirty) && 'input-error-content'}}"
          />
          <div
            *ngIf="password?.errors?.['required'] && (password?.dirty)"
            class="form-input-error"
          >
            Password is required
          </div>
          <div
            *ngIf="resetPasswordForm.errors?.['notmatched']"
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
            class="form-input-field {{(confirmPassword?.errors?.['required'] || resetPasswordForm.errors?.['notmatched']) && (confirmPassword?.dirty) && 'input-error-content'}}"
          />
          <div
            *ngIf="confirmPassword?.errors?.['required'] && (confirmPassword?.dirty)"
            class="form-input-error"
          >
            Confirm Password is required
          </div>
          <div
            *ngIf="resetPasswordForm.errors?.['notmatched']"
            class="form-input-error"
          >
            Password and confirm passwords don't match
          </div>
        </div>
        <ng-container *ngIf="state['config'].is_strong_password_enabled">
          <password-strength-indicator
            [value]="password?.value || ''"
            (onButtonStateChange)="setDisableButton($event)"
          ></password-strength-indicator>
          <br />
        </ng-container>
        <styled-button
          [appearance]="buttonAppearance.Primary"
          [disabled]="
            componentState['disableSignupButton'] ||
            componentState['loading'] ||
            !resetPasswordForm.valid
          "
        >
          <ng-container *ngIf="componentState['loading']; else continue_text">
            Processing ...
          </ng-container>
          <ng-template #continue_text> Continue </ng-template>
        </styled-button>
      </form>
    </styled-wrapper>
  `,
  styleUrls: ['../styles/input-form.styles.css'],
})
export class AuthorizerResetPassword extends URLSearchParams {
  @Input() onReset: any;

  constructor(
    private contextService: AuthorizerContextService,
    private route: ActivatedRoute
  ) {
    super();
    this.contextService.getState().subscribe((state) => {
      this.state = state;
    });
    const tokenString = this.route.snapshot.queryParamMap.get('token');
    this.token = tokenString;
    this.redirect_uri = this.route.snapshot.queryParamMap.get('redirect_uri');

    if (!tokenString) this.componentState['error'] = 'Invalid token';
  }

  token: any;
  redirect_uri: any;
  state: Record<string, any> = {};
  messageType: any = MessageType;
  buttonAppearance: any = ButtonAppearance;
  componentState: Record<string, any> = {
    error: null,
    loading: false,
    disableContinueButton: false,
  };

  resetPasswordForm = new FormGroup(
    {
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null, [Validators.required]),
    },
    { validators: passwordMatchingValidatior }
  );

  get password() {
    return this.resetPasswordForm.get('password');
  }

  get confirmPassword() {
    return this.resetPasswordForm.get('confirmPassword');
  }

  onCloseHandler(stateKey: string) {
    this.componentState[stateKey] = null;
  }

  setDisableButton(value: boolean) {
    this.componentState['disableContinueButton'] = value;
  }

  async onSubmit() {
    this.componentState['loading'] = true;
    try {
      const res = await this.state['authorizerRef'].resetPassword({
        token: this.token,
        password: this.password?.value,
        confirm_password: this.confirmPassword?.value,
      });
      this.componentState['loading'] = false;
      this.componentState['error'] = null;
      if (this.onReset) {
        this.onReset(res);
      } else {
        window.location.href =
          this.redirect_uri ||
          this.state['config'].redirectURL ||
          window.location.origin;
      }
    } catch (error: any) {
      this.componentState['loading'] = false;
      this.componentState['error'] = error.message;
    }
  }
}
