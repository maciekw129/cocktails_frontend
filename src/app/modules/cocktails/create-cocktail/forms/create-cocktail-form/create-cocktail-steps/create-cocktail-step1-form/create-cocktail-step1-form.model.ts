import { FormControl } from '@angular/forms';
import { Category, Difficulty } from '@app/modules/cocktails/cocktails.model';

export interface CreateCocktailStep1 {
  name: string;
  description: string;
  imageUrl: string;
  category: Category;
  difficulty: Difficulty;
}

export interface CreateCocktailStep1Form {
  name: FormControl<string>;
  description: FormControl<string>;
  imageUrl: FormControl<string>;
  category: FormControl<Category>;
  difficulty: FormControl<Difficulty>;
}
