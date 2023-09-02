import { FormControl } from '@angular/forms';

export interface IngredientForm {
  name: FormControl<string>;
  quantity: FormControl<string>;
  unit: FormControl<string>;
  isAlcoholic: FormControl<boolean>;
}

export enum Units {
  g = 1,
  ml = 2,
  l = 3,
  pcs = 4,
}
