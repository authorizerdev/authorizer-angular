import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthorizerContextService } from '../authorizer-context.service';
import { MessageType, Views } from '../constants';

@Component({
  selector: 'authorizer-basic-auth-login',
  template: `
    <ng-container *ngIf="otpData['isScreenVisible']; else other_content">
      <authorizer-verify-otp
        [onLogin]="onLogin"
        [email]="otpData['email']"
        [changeViewEventEmitter]="changeView"
      ></authorizer-verify-otp>
    </ng-container>
    <ng-template #other_content>
      <div>
        <ng-container *ngIf="componentState['error']">
          <message
            [type]="messageType.Error"
            [text]="componentState['error']"
            [showClose]="true"
            (onClose)="onCloseHandler($event)"
          ></message>
        </ng-container>
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
  styles: [],
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
  componentState: Record<string, any> = {
    loading: false,
    error: null,
  };
  otpData: Record<string, any> = {
    isScreenVisible: false,
    email: null,
  };

  onCloseHandler(stateKey: string) {
    this.componentState[stateKey] = null;
  }

  setView(view: string) {
    this.changeView.emit(view);
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.otpData['isScreenVisible'] = true;
    }, 2000);
  }
}
