import { FormControl } from '@angular/forms';
import {
  Category,
  Difficulty,
} from '@app/modules/create-cocktail/create-cocktail.model';

export interface CreateCocktailStep1 {
  name: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
}

export interface CreateCocktailStep1Form {
  name: FormControl<string>;
  description: FormControl<string>;
  category: FormControl<Category>;
  difficulty: FormControl<Difficulty>;
}
