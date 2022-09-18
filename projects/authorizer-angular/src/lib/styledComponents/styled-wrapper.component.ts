import { Component } from '@angular/core';

@Component({
  selector: 'styled-wrapper',
  template: `<div class="styled-wrapper"><ng-content></ng-content></div>`,
  styles: [
    `
      .styled-wrapper {
        font-family: var(--fonts-font-stack);
        color: var(--text-color);
        font-size: var(--fonts-medium-text);
        box-sizing: border-box;
        width: 100%;
      }
      .styled-wrapper *,
      *:before,
      *:after {
        box-sizing: inherit;
      }
    `,
  ],
})
export class StyledWrapper {
  constructor() {}
}
