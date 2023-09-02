import { FormControl, FormGroup } from '@angular/forms';
import { Ingredient } from '@app/modules/create-cocktail/create-cocktail.model';

export interface CreateCocktailForm {
  step1: FormGroup<Step1Form>;
  step2: FormGroup<Step2Form>;
  step3: FormGroup<Step3Form>;
}

export interface IngredientGroup {
  name: FormControl<string>;
  quantity: FormControl<string>;
  unit: FormControl<string>;
  isAlcoholic: FormControl<boolean>;
}

export interface Step1Form {
  name: FormControl<string>;
  description: FormControl<string>;
}

export interface Step2Form {
  ingredients: FormControl<Ingredient[]>;
}

export interface Step3Form {
  preparation: any;
}
