import { Component, Input } from '@angular/core';

@Component({
  selector: 'styled-link',
  template: `
    <span
      class="styled-link"
      style="margin-bottom: {{ marginBottom }}; display: flex;"
    >
      <ng-content></ng-content>
    </span>
  `,
  styles: [
    `
      .styled-link {
        color: var(--authorizer-primary-color);
        cursor: pointer;
      }
    `,
  ],
})
export class StyledLink {
  @Input() marginBottom: string = '0px';

  constructor() {}
}
