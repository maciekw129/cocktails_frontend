import { FormControl } from '@angular/forms';
import { Category, Difficulty } from '@app/core/model/cocktails.model';

export interface FiltersForm {
  name: FormControl<string>;
  category: FormControl<Category>;
  difficulty: FormControl<Difficulty>;
  ingredients: FormControl<string>;
}