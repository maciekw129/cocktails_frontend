import { FormControl } from '@angular/forms';

export interface UserDataForm {
  login: FormControl<string>;
  email: FormControl<string>;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
}
