import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../../shared/forms/controls/text-input/text-input.component';
import {
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginForm } from './login-form.model';
import { LoginPayload } from '../../auth.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonValidators } from '../../../shared/forms/validators/common-validators';
import { FormComponent } from '../../../shared/forms/form-component';

@Component({
  selector: 'c-login-form',
  standalone: true,
  imports: [
    CommonModule,
    TextInputComponent,
    ReactiveFormsModule,
    ButtonComponent,
  ],
  templateUrl: './login-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent extends FormComponent<LoginPayload, FormGroup<LoginForm>>{
   protected buildForm() {
    return this.fb.group({
      email: this.fb.control('', {
        validators: [Validators.required, CommonValidators.emailValidator()],
      }),
      password: this.fb.control('', { validators: Validators.required }),
    });
  }
}
