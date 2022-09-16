import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-social-login',
  template: `<div>{{ body }}</div>`,
  styles: [],
})
export class AuthorizerSocialLogin implements OnInit {
  @Input() body: string = 'Authorizer Social Login Component';

  constructor() {}

  ngOnInit(): void {}
}
