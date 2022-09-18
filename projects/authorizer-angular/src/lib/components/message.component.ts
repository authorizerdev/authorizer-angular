import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'message',
  template: `<div>Message Component</div>`,
  styles: [],
})
export class Message implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
