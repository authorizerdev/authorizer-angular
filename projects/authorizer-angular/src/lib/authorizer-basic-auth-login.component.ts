import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-basic-auth-login',
  template: `{{ body }}`,
  styles: [],
})
export class AuthorizerBasicAuthLogin implements OnInit {
  @Input() body: string = 'Authorizer Basic Auth Login Component';

  constructor() {}

  ngOnInit(): void {}
}
