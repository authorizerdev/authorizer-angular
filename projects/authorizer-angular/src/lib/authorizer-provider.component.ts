import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-provider',
  template: `<div [style.color]="color">{{ body }}</div>`,
  styles: [],
})
export class AuthorizerProvider implements OnInit {
  @Input() color: string = '#000';
  @Input() body: string = 'Authorizer Provider Component';

  constructor() {}

  ngOnInit(): void {}
}
