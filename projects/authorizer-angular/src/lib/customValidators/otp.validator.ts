import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { isValidOtp } from '../utils/common';

export function createOtpValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const otpValid = isValidOtp(value);

    return !otpValid ? { invalidFormat: true } : null;
  };
}
