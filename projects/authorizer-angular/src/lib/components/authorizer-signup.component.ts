import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-signup',
  template: `<div>{{ body }}</div>`,
  styles: [],
})
export class AuthorizerSignup implements OnInit {
  @Input() body: string = 'Authorizer Signup Component';

  constructor() {}

  ngOnInit(): void {}
}
