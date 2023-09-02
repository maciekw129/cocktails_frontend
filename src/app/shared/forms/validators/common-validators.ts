import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';
import { Patterns } from '@app/shared/utils/patterns';
import { UniversalLimits } from '@app/shared/forms/validators/universal-limits';
import { FormUtils } from '@app/shared/forms/form-utils';

export class CommonValidators {
  public static email = () => {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      if (!value) return null;

      return !Patterns.email.test(value) ? { emailPattern: true } : null;
    };
  };

  public static password = () => {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      const isLongEnough = value.length >= UniversalLimits.passwordLength;
      const hasLetter = Patterns.hasAtLeastOneLetter.test(value);
      const hasNumber = Patterns.hasAtLeastOneNumber.test(value);

      const isValid = isLongEnough && hasNumber && hasLetter;

      return isValid ? null : { password: true };
    };
  };

  public static twoControlsMatch = (otherControl: FormControl) => {
    return (control: FormControl): ValidationErrors | null => {
      const otherControlName = FormUtils.getControlName(otherControl);
      const isValid = otherControl.value === control.value;

      return isValid ? null : { controlsMatch: { otherControlName } };
    };
  };
}
