import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../../shared/forms/form.component';
import { RegisterPayload } from '../../auth.model';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterForm } from './register-form.model';
import { TextInputComponent } from '../../../shared/forms/controls/text-input/text-input.component';
import { FormService } from '../../../shared/forms/form.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Helpers } from '../../../shared/utils/helpers';
import { CommonValidators } from '../../../shared/forms/validators/common-validators';

@Component({
  selector: 'c-register-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormService],
})
export class RegisterFormComponent
  extends FormComponent<RegisterPayload, FormGroup<RegisterForm>>
  implements OnInit
{
  get passwordControl() {
    return this.form.controls.password;
  }

  get confirmPasswordControl() {
    return this.form.controls.confirmPassword;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.confirmPasswordControl.addValidators(
      CommonValidators.twoControlsMatch(this.passwordControl)
    );
  }

  protected override buildForm() {
    return this.fb.group({
      login: this.fb.control('', { validators: Validators.required }),
      email: this.fb.control('', {
        validators: [Validators.required, CommonValidators.email()],
      }),
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      password: this.fb.control('', {
        validators: [Validators.required, CommonValidators.password()],
      }),
      confirmPassword: this.fb.control('', { validators: Validators.required }),
    });
  }

  protected setEmittingValue() {
    return Helpers.removeProperty(this.form.getRawValue(), 'confirmPassword');
  }
}
