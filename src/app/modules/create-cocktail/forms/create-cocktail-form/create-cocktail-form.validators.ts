import { FormControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CreateCocktailFormValidators {
  public static requiredIngredients(): ValidatorFn {
    return (control: FormControl<[]>): ValidationErrors | null => {
      const isValid = Boolean(control.value.length);

      return isValid ? null : { requiredIngredients: true };
    };
  }
}
