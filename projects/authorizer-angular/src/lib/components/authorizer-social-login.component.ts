import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-social-login',
  template: `<div>Authorizer Social Login Component</div>`,
  styles: [],
})
export class AuthorizerSocialLogin implements OnInit {
  @Input() urlProps: any = {};

  constructor() {}

  ngOnInit(): void {}
}
