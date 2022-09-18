import { Component } from '@angular/core';

@Component({
  selector: 'styled-footer',
  template: `<div class="styled-footer"><ng-content></ng-content></div>`,
  styles: [
    `
      .styled-footer {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-top: 15px;
      }
    `,
  ],
})
export class StyledFooter {
  constructor() {}
}
