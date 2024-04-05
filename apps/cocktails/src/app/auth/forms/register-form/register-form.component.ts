import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormComponent } from '@src/app/shared/forms/form.component';
import { RegisterPayload } from '@src/app/auth/auth.model';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterForm } from '@src/app/auth/forms/register-form/register-form.model';
import { FormService } from '@src/app/shared/forms/form.service';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { Helpers } from '@src/app/shared/utils/helpers';
import { CommonValidators } from '@src/app/shared/forms/validators/common-validators';
import { TextInputComponent } from '@cocktails-ui';

@Component({
  selector: 'c-register-form',
  standalone: true,
  imports: [ReactiveFormsModule, TextInputComponent, ButtonComponent],
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
