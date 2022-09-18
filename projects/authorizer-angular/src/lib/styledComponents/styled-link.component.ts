import { Component, Input } from '@angular/core';

@Component({
  selector: 'styled-link',
  template: `
    <a class="styled-link" style="margin-bottom: {{ marginBottom }};">
      <ng-content></ng-content>
    </a>
  `,
  styles: [
    `
      .styled-link {
        color: var(--primary-color);
        cursor: pointer;
        text-decoration: none !important;
      }
    `,
  ],
})
export class StyledLink {
  @Input() marginBottom: string = '0px';

  constructor() {}
}
