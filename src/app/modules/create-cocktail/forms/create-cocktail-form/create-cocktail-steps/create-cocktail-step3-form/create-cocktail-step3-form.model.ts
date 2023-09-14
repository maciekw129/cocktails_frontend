import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface CreateCocktailStep3 {
  preparation: PreparationStep[];
}

export interface PreparationStep {
  step: number;
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
  SQUEEZE = 'SQUEEZE',
  SHAKE = 'SHAKE',
}

export interface CreateCocktailStep3Form {
  preparation: FormArray<FormGroup<PreparationStepForm>>;
}

export interface PreparationStepForm {
  step: FormControl<number>;
  ingredient: FormControl<string>;
  action: FormControl<Action>;
  tip: FormControl<string>;
}
