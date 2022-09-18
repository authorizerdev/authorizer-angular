import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-basic-auth-login',
  template: `<div>Authorizer Basic Auth Login Component</div>`,
  styles: [],
})
export class AuthorizerBasicAuthLogin implements OnInit {
  @Input() setView: any;
  @Input() onLogin: any;
  @Input() urlProps: any = {};

  constructor() {}

  ngOnInit(): void {}
}
