import { FormControl } from '@angular/forms';
import {
  Category,
  Difficulty,
  Ingredient,
  PreparationStep,
} from '@app/core/model/cocktails.model';

export interface CreateCocktailForm {
  name: FormControl<string>;
  description: FormControl<string>;
  imageUrl: FormControl<string>;
  category: FormControl<Category>;
  difficulty: FormControl<Difficulty>;
  preparation: FormControl<PreparationStep[]>;
  ingredients: FormControl<Ingredient[]>;
}
