import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-magic-link-login',
  template: `<div>{{ body }}</div>`,
  styles: [],
})
export class AuthorizerMagicLinkLogin implements OnInit {
  @Input() body: string = 'Authorizer Magic Link Login Component';

  constructor() {}

  ngOnInit(): void {}
}
