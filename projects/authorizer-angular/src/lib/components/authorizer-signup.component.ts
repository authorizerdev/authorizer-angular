import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-signup',
  template: `<div>Authorizer Signup Component</div>`,
  styles: [],
})
export class AuthorizerSignup implements OnInit {
  @Input() setView: any;
  @Input() onSignup: any;
  @Input() urlProps: any = {};

  constructor() {}

  ngOnInit(): void {}
}
