import { FormControl } from '@angular/forms';
import { Ingredient } from '@app/modules/create-cocktail/create-cocktail.model';

export interface CreateCocktailStep2 {
  ingredients: Ingredient[];
}

export interface CreateCocktailStep2Form {
  ingredients: FormControl<Ingredient[]>;
}
