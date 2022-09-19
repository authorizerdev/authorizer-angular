import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { AuthorizerContextService } from '../authorizer-context.service';
import { Views } from '../constants';

@Component({
  selector: 'authorizer-verify-otp',
  template: `
    <div>
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
    </div>
  `,
  styles: [],
})
export class AuthorizerVerifyOtp implements OnInit {
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
  componentState: Record<string, any> = {
    error: null,
    successMessage: null,
    loading: false,
    sendingOtp: false,
    otp: null,
  };

  setView(value: string) {
    if (this.changeViewEventEmitter) {
      this.changeViewEventEmitter.emit(value);
    }
  }

  resendOtp() {
    console.log('resending otp ==>> ');
  }

  ngOnInit(): void {}
}
