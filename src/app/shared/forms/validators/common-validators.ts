import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Patterns } from '../../utils/patterns';

export class CommonValidators {
  public static emailValidator = () => {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value as string;

      if (!value) return null;

      return !Patterns.email.test(value) ? { emailPattern: true } : null;
    };
  };
}
