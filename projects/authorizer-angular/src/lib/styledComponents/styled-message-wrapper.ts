import { Component, Input } from '@angular/core';
import { MessageType } from '../constants';

@Component({
  selector: 'styled-message-wrapper',
  template: `
    <div
      class="styled-message-wrapper"
      style="background-color: {{
        type === messageType.Error
          ? 'var(--danger-color)'
          : 'var(--success-color)'
      }}"
    >
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .styled-message-wrapper {
        padding: 10px;
        color: white;
        border-radius: var(--radius-card);
        margin: 10px 0px;
        font-size: var(--fonts-small-text);
      }
    `,
  ],
})
export class StyledMessageWrapper {
  @Input() type: string = MessageType.Success;

  constructor() {}

  messageType: any = MessageType;
}
