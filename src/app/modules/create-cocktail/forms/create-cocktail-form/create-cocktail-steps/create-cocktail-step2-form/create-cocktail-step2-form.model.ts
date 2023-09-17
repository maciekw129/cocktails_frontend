import { FormControl } from '@angular/forms';
import { Ingredient } from '@app/core/model/cocktails.model';

export interface CreateCocktailStep2 {
  ingredients: Ingredient[];
}

export interface CreateCocktailStep2Form {
  ingredients: FormControl<Ingredient[]>;
}
