import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MessageType } from '../constants';
import { capitalizeFirstLetter } from '../utils/common';

@Component({
  selector: 'message',
  template: `
    <styled-message-wrapper [type]="type">
      <styled-flex>
        <div style="flex: 1;">{{ formatText(text) }}</div>
        <ng-container *ngIf="showClose">
          <span style="cursor: pointer;" (click)="onCloseHandler()">
            <close></close>
          </span>
        </ng-container>
      </styled-flex>
    </styled-message-wrapper>
  `,
})
export class Message {
  @Input() type: string = MessageType.Success;
  @Input() text: string = '';
  @Input() showClose: boolean = false;

  @Output() onClose = new EventEmitter<string>();

  constructor() {}

  formatText: Function = capitalizeFirstLetter;

  onCloseHandler() {
    if (this.type === MessageType.Error) {
      this.onClose.emit('error');
    } else {
      this.onClose.emit('successMessage');
    }
  }
}
