import {
  AbstractControl,
  FormArray,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

export class CreateCocktailStep3FormValidators {
  public static requiredPreparationSteps(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors => {
      if (control instanceof FormArray) {
        return control.length ? null : { requiredSteps: true };
      }
      throw new Error(
        'CreateCocktailStep3FormValidators: you must pass form array to requiredPreparationSteps validator.'
      );
    };
  }
}
