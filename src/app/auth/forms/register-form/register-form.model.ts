import { FormControl } from '@angular/forms';

export interface RegisterForm {
  login: FormControl<string>;
  email: FormControl<string>;
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  password: FormControl<string>;
}
