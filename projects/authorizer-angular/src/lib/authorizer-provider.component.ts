import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'authorizer-provider',
  template: `<button [style.color]="color">{{ body }}</button>`,
  styles: [],
})
export class AuthorizerProvider implements OnInit {
  @Input() color: string = '#000';
  @Input() body: string = 'Hello world';

  constructor() {}

  ngOnInit(): void {}
}
