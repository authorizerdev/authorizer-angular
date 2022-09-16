import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-basic-auth-login',
  template: `<div>{{ body }}</div>`,
  styles: [],
})
export class AuthorizerBasicAuthLogin implements OnInit {
  @Input() body: string = 'Authorizer Basic Auth Login Component';

  constructor() {}

  ngOnInit(): void {}
}
