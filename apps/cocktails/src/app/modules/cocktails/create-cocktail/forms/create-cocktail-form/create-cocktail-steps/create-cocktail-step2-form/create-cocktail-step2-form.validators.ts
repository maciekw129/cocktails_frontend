import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { Ingredient } from '@app/modules/cocktails/cocktails.model';

export class CreateCocktailStep2FormValidators {
  public static requiredIngredients(): ValidatorFn {
    return (control: AbstractControl<[]>): ValidationErrors | null => {
      const isValid = Boolean(control.value.length);

      return isValid ? null : { requiredIngredients: true };
    };
  }

  public static uniqueIngredients(ingredients: FormControl<Ingredient[]>): ValidatorFn {
    return (control: AbstractControl<string>): ValidationErrors => {
      const nameArray = ingredients.value.map(({ name }) => name);
      const isValid = !nameArray.includes(control.value);

      return isValid ? null : { uniqueIngredients: true };
    };
  }
}
