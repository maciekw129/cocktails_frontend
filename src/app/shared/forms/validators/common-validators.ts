import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Patterns } from '@src/app/shared/utils/patterns';
import { UniversalLimits } from '@src/app/shared/forms/validators/universal-limits';
import { FormUtils } from '@src/app/shared/forms/form-utils';

export class CommonValidators {
  public static email = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      if (!value) return null;

      return !Patterns.email.test(value) ? { emailPattern: true } : null;
    };
  };

  public static password = (): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      const isLongEnough = value.length >= UniversalLimits.passwordLength;
      const hasLetter = Patterns.hasAtLeastOneLetter.test(value);
      const hasNumber = Patterns.hasAtLeastOneNumber.test(value);

      const isValid = isLongEnough && hasNumber && hasLetter;

      return isValid ? null : { password: true };
    };
  };

  public static twoControlsMatch = (otherControl: FormControl): ValidatorFn => {
    return (control: AbstractControl): ValidationErrors | null => {
      const otherControlName = FormUtils.getControlName(otherControl);
      const isValid = otherControl.value === control.value;

      return isValid ? null : { controlsMatch: { otherControlName } };
    };
  };
}
