import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-forgot-password',
  template: `<div>{{ body }}</div>`,
  styles: [],
})
export class AuthorizerForgotPassword implements OnInit {
  @Input() body: string = 'Authorizer Forgot Password Component';

  constructor() {}

  ngOnInit(): void {}
}
