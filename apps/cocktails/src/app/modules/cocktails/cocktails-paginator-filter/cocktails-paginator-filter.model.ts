import { Category, Difficulty } from '@app/modules/cocktails/cocktails.model';
import { FormControl } from '@angular/forms';

export interface CocktailsFiltersForm {
  name: FormControl<string>;
  category: FormControl<Category>;
  difficulty: FormControl<Difficulty>;
  ingredients: FormControl<string>;
}
