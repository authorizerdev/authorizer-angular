import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-forgot-password',
  template: `<div>Authorizer Forgot Password Component</div>`,
  styles: [],
})
export class AuthorizerForgotPassword implements OnInit {
  @Input() setView: any;
  @Input() onForgotPassword: any;
  @Input() urlProps: any = {};

  constructor() {}

  ngOnInit(): void {}
}
