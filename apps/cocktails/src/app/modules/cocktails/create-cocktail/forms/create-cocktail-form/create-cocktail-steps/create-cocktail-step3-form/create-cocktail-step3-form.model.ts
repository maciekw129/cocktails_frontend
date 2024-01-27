import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { Action, PreparationStep } from '@app/modules/cocktails/cocktails.model';

export interface CreateCocktailStep3 {
  preparation: PreparationStep[];
}

export interface CreateCocktailStep3Form {
  preparation: FormArray<FormGroup<PreparationStepForm>>;
}

export interface PreparationStepForm {
  step: FormControl<number>;
  ingredient: FormControl<string | null>;
  action: FormControl<Action>;
  tip: FormControl<string>;
}
