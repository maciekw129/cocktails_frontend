import { FormControl } from '@angular/forms';
import { Unit } from '@src/app/core/model/cocktails.model';

export interface IngredientForm {
  name: FormControl<string>;
  quantity: FormControl<number>;
  unit: FormControl<Unit>;
  isAlcoholic: FormControl<boolean>;
}
