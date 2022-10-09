import { Component } from '@angular/core';

@Component({
  selector: 'styled-separator',
  template: `<div class="styled-separator"><ng-content></ng-content></div>`,
  styles: [
    `
      .styled-separator {
        display: flex;
        align-items: center;
        text-align: center;
        margin: 10px 0px;
      }
      .styled-separator::before {
        content: '';
        flex: 1;
        border-bottom: 1px solid var(--authorizer-gray-color);
      }
      .styled-separator::after {
        content: '';
        flex: 1;
        border-bottom: 1px solid var(--authorizer-gray-color);
      }
      .styled-separator:not(:empty)::before {
        margin-right: 0.25em;
      }
      .styled-separator:not(:empty)::after {
        margin-left: 0.25em;
      }
    `,
  ],
})
export class StyledSeparator {
  constructor() {}
}
