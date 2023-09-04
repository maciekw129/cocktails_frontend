import { FormControl, FormGroup } from '@angular/forms';
import { CreateCocktailStep1Form } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step1-form/create-cocktail-step1-form.model';
import { CreateCocktailStep2Form } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/create-cocktail-step2-form.model';

export interface CreateCocktailForm {
  step1: FormGroup<CreateCocktailStep1Form>;
  step2: FormGroup<CreateCocktailStep2Form>;
  step3: FormGroup<any>;
}

export interface IngredientGroup {
  name: FormControl<string>;
  quantity: FormControl<string>;
  unit: FormControl<string>;
  isAlcoholic: FormControl<boolean>;
}
