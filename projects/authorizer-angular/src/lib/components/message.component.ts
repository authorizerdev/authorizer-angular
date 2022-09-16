import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'message',
  template: `<div>{{ body }}</div>`,
  styles: [],
})
export class Message implements OnInit {
  @Input() body: string = 'Message Component';

  constructor() {}

  ngOnInit(): void {}
}
