import { FormControl } from '@angular/forms';
import { Unit } from '@app/modules/cocktails/cocktails.model';

export interface IngredientForm {
  name: FormControl<string>;
  quantity: FormControl<number>;
  unit: FormControl<Unit>;
  isAlcoholic: FormControl<boolean>;
}
