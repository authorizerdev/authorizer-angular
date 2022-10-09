import { Component, Input } from '@angular/core';
import { ButtonAppearance } from '../constants';

@Component({
  selector: 'styled-button',
  template: `
    <button
      class="styled-button"
      style="width: {{ style['width'] }};
      background-color: {{
        disabled
          ? 'var(--authorizer-primary-disabled-color)'
          : appearance === buttonAppearance.Primary
          ? 'var(--authorizer-primary-color)'
          : 'var(--authorizer-white-color)'
      }};
      color: {{
        appearance === buttonAppearance.Default
          ? 'var(--authorizer-text-color)'
          : 'var(--authorizer-white-color)'
      }};
      border: {{ appearance === buttonAppearance.Primary ? '0px' : '1px' }};"
      [disabled]="disabled"
    >
      <ng-content></ng-content>
    </button>
  `,
  styles: [
    `
      .styled-button {
        padding: 15px 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        min-width: 400px;
        max-height: 64px;
        border-radius: var(--authorizer-radius-button);
        border-color: var(--authorizer-text-color) !important;
        border-style: solid !important;
        cursor: pointer;
        position: relative;
      }
      .styled-button:disabled {
        cursor: not-allowed;
        background-color: var(--authorizer-primary-disabled-color);
      }
    `,
  ],
})
export class StyledButton {
  @Input() style: Record<string, any> = {
    width: '100%',
  };
  @Input() appearance: any = ButtonAppearance.Default;
  @Input() disabled: boolean = false;
  constructor() {}

  buttonAppearance: any = ButtonAppearance;
}
