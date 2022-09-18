import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-magic-link-login',
  template: `<div>Authorizer Magic Link Login Component</div>`,
  styles: [],
})
export class AuthorizerMagicLinkLogin implements OnInit {
  @Input() onMagicLinkLogin: any;
  @Input() urlProps: any = {};

  constructor() {}

  ngOnInit(): void {}
}
