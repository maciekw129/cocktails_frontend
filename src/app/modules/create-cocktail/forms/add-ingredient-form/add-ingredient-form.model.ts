import { FormControl } from '@angular/forms';

export interface IngredientForm {
  name: FormControl<string>;
  quantity: FormControl<string>;
  unit: FormControl<string>;
  isAlcoholic: FormControl<boolean>;
}
