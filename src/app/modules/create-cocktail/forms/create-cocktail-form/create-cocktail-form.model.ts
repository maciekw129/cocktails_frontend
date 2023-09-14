import { FormControl } from '@angular/forms';
import { PreparationStep } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step3-form/create-cocktail-step3-form.model';
import {
  Category,
  Difficulty,
  Ingredient,
} from '@app/modules/create-cocktail/create-cocktail.model';

export interface CreateCocktailForm {
  name: FormControl<string>;
  description: FormControl<string>;
  category: FormControl<Category>;
  difficulty: FormControl<Difficulty>;
  preparation: FormControl<PreparationStep[]>;
  ingredients: FormControl<Ingredient[]>;
}
