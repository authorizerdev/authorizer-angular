import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer',
  template: `<div style="position: relative;"></div>`,
  styles: [],
})
export class AuthorizerRoot implements OnInit {
  @Input() body: string = 'Authorizer Root Component';

  constructor() {}

  ngOnInit(): void {}
}
