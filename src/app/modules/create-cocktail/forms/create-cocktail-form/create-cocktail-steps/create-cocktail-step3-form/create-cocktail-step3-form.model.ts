import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface CreateCocktailStep3 {
  preparation: PreparationStep[];
}

export interface PreparationStep {
  ingredient: string;
  action: string;
  tip: string;
}

export enum Action {
  ADD = 'ADD',
  POUR = 'POUR',
  MIX = 'MIX',
  DECORATE = 'DECORATE',
  WAIT = 'WAIT',
}

export interface CreateCocktailStep3Form {
  preparation: FormArray<FormGroup<PreparationStepForm>>;
}

export interface PreparationStepForm {
  ingredient: FormControl<string>;
  action: FormControl<Action>;
  tip: FormControl<string>;
}
