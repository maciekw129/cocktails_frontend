import { FormControl } from '@angular/forms';

export interface CreateCocktailStep1 {
  name: string;
  description: string;
}

export interface CreateCocktailStep1Form {
  name: FormControl<string>;
  description: FormControl<string>;
}
