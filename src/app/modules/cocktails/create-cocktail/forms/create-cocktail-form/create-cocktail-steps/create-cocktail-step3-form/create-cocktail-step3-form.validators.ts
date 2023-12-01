import { FormArray, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CreateCocktailStep3FormValidators {
  public static requiredPreparationSteps(): ValidatorFn {
    return (control: FormArray): ValidationErrors => {
      return control.length ? null : { requiredSteps: true };
    };
  }
}
