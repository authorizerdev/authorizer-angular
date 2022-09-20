import {
  Component,
  OnChanges,
  Input,
  EventEmitter,
  Output,
  SimpleChanges,
} from '@angular/core';
import { passwordStrengthIndicatorOpacity } from '../constants';
import { validatePassword } from '../utils/common';

@Component({
  selector: 'password-strength-indicator',
  template: `
    <div style="margin: 2% 0 0;">
      <styled-flex wrap="nowrap">
        <div
          class="styled-password-strength"
          style="opacity: {{
            componentState.score > 2
              ? indicatorOpacity['weak']
              : indicatorOpacity['default']
          }};"
        ></div>
        <div
          class="styled-password-strength"
          style="opacity: {{
            componentState.score > 3
              ? indicatorOpacity['good']
              : indicatorOpacity['default']
          }};"
        ></div>
        <div
          class="styled-password-strength"
          style="opacity: {{
            componentState.score > 4
              ? indicatorOpacity['strong']
              : indicatorOpacity['default']
          }};"
        ></div>
        <div
          class="styled-password-strength"
          style="opacity: {{
            componentState.score > 4
              ? indicatorOpacity['veryStrong']
              : indicatorOpacity['default']
          }};"
        ></div>
        <div>{{ componentState.strength }}</div>
      </styled-flex>
      <p>
        <b>Criteria for a strong password:</b>
      </p>
      <styled-flex flexDirection="column" alignItems="flex-start">
        <styled-flex>
          <input
            readOnly
            type="checkbox"
            [checked]="componentState.hasSixChar"
          />
          <div style="margin-left: 5px;">At least 6 characters</div>
        </styled-flex>
      </styled-flex>
      <styled-flex flexDirection="column" alignItems="flex-start">
        <styled-flex>
          <input
            readOnly
            type="checkbox"
            [checked]="componentState.hasLowerCase"
          />
          <div style="margin-left: 5px;">At least 1 lowercase letter</div>
        </styled-flex>
      </styled-flex>
      <styled-flex flexDirection="column" alignItems="flex-start">
        <styled-flex>
          <input
            readOnly
            type="checkbox"
            [checked]="componentState.hasUpperCase"
          />
          <div style="margin-left: 5px;">At least 1 uppercase letter</div>
        </styled-flex>
      </styled-flex>
      <styled-flex flexDirection="column" alignItems="flex-start">
        <styled-flex>
          <input
            readOnly
            type="checkbox"
            [checked]="componentState.hasNumericChar"
          />
          <div style="margin-left: 5px;">At least 1 numeric character</div>
        </styled-flex>
      </styled-flex>
      <styled-flex flexDirection="column" alignItems="flex-start">
        <styled-flex>
          <input
            readOnly
            type="checkbox"
            [checked]="componentState.hasSpecialChar"
          />
          <div style="margin-left: 5px;">At least 1 special character</div>
        </styled-flex>
      </styled-flex>
      <styled-flex flexDirection="column" alignItems="flex-start">
        <styled-flex>
          <input
            readOnly
            type="checkbox"
            [checked]="componentState.maxThirtySixChar"
          />
          <div style="margin-left: 5px;">Maximum 36 characters</div>
        </styled-flex>
      </styled-flex>
    </div>
  `,
  styleUrls: ['../styles/password-strength.styles.css'],
})
export class PasswordStrengthIndicator implements OnChanges {
  @Input() value: any;

  @Output() onButtonStateChange = new EventEmitter<boolean>();

  constructor() {}

  indicatorOpacity: any = passwordStrengthIndicatorOpacity;
  componentState: any = {
    strength: '',
    score: 0,
    hasSixChar: false,
    hasLowerCase: false,
    hasNumericChar: false,
    hasSpecialChar: false,
    hasUpperCase: false,
    maxThirtySixChar: false,
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['value']) {
      const validationData = validatePassword(this.value);
      this.componentState = validationData;
      if (Object.values(validationData).some((isValid) => isValid === false)) {
        this.onButtonStateChange.emit(true);
      } else {
        this.onButtonStateChange.emit(false);
      }
    }
  }
}
