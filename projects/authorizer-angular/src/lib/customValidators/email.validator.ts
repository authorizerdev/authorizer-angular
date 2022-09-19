import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isValidEmail } from '../utils/common';

export function createEmailValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const emailValid = isValidEmail(value);

    return !emailValid ? { invalidFormat: true } : null;
  };
}
