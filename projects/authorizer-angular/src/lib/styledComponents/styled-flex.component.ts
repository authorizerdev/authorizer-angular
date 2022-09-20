import { Component, Input } from '@angular/core';

@Component({
  selector: 'styled-flex',
  template: `
    <div
      style="display: flex;
      flex-direction: {{ flexDirection }};
        align-items: {{ alignItems }};
        justify-content: {{ justifyContent }};
        flex-wrap: {{ wrap }};
        width: {{ width }};"
    >
      <ng-content></ng-content>
    </div>
  `,
})
export class StyledFlex {
  @Input() flexDirection: string = 'row';
  @Input() alignItems: string = 'center';
  @Input() justifyContent: string = 'center';
  @Input() wrap: string = 'wrap';
  @Input() width: string = 'inherit';

  constructor() {}
}
