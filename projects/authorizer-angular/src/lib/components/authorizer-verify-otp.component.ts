import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-verify-otp',
  template: `<div>{{ body }}</div>`,
  styles: [],
})
export class AuthorizerVerifyOtp implements OnInit {
  @Input() body: string = 'Authorizer Verify Otp Component';

  constructor() {}

  ngOnInit(): void {}
}
