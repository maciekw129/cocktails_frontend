import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '@app/shared/forms/controls/text-input/text-input.component';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginForm } from '@app/auth/forms/login-form/login-form.model';
import { LoginPayload } from '@app/auth/auth.model';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { CommonValidators } from '@app/shared/forms/validators/common-validators';
import { FormComponent } from '@app/shared/forms/form.component';
import { FormService } from '@app/shared/forms/form.service';

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
  providers: [FormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent extends FormComponent<
  LoginPayload,
  FormGroup<LoginForm>
> {
  protected override buildForm() {
    return this.fb.group({
      email: this.fb.control('', {
        validators: [Validators.required, CommonValidators.email()],
      }),
      password: this.fb.control('', { validators: Validators.required }),
    });
  }

  protected override setEmittingValue() {
    return this.form.getRawValue();
  }
}
