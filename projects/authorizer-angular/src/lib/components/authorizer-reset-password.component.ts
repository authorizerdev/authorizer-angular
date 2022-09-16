import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-reset-password',
  template: `<div>{{ body }}</div>`,
  styles: [],
})
export class AuthorizerResetPassword implements OnInit {
  @Input() body: string = 'Authorizer Reset Password Component';

  constructor() {}

  ngOnInit(): void {}
}
