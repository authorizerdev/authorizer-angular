import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthorizerContextService } from '../authorizer-context.service';
import { Views } from '../constants';

@Component({
  selector: 'authorizer-basic-auth-login',
  template: `
    <div>
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

  setView(view: string) {
    this.changeView.emit(view);
  }

  ngOnInit(): void {}
}
