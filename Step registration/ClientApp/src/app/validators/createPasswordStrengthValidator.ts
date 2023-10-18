import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function createPasswordStrengthValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {

    const value = control.value;

    if (!value) {
      return null;
    }

    const hasNumeric = /[0-9]+/.test(value);

    const hasSpecial = /[!@#$&*]+/.test(value);

    const passwordValid = hasNumeric && hasSpecial;

    return !passwordValid ? { passwordStrength: true } : null;
  }
}
