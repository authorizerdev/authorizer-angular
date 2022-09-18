import { Component, Input } from '@angular/core';

@Component({
  selector: 'styled-link',
  template: `
    <span class="styled-link" style="margin-bottom: {{ marginBottom }};">
      <ng-content></ng-content>
    </span>
  `,
  styles: [
    `
      .styled-link {
        color: var(--primary-color);
        cursor: pointer;
      }
    `,
  ],
})
export class StyledLink {
  @Input() marginBottom: string = '0px';

  constructor() {}
}
