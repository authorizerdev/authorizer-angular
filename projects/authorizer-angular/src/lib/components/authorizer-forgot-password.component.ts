import { Component, Input, EventEmitter, Output } from '@angular/core';
import { ButtonAppearance, MessageType } from '../constants';
import { AuthorizerContextService } from '../authorizer-context.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { createEmailValidator } from '../customValidators';

@Component({
  selector: 'authorizer-forgot-password',
  template: `<div>Authorizer Forgot Password Component</div>`,
  styles: [],
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
}
