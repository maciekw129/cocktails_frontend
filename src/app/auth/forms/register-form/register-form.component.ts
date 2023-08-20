import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../../shared/forms/form.component';
import { RegisterPayload } from '../../auth.model';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RegisterForm } from './register-form.model';
import { TextInputComponent } from '../../../shared/forms/controls/text-input/text-input.component';
import { FormService } from '../../../shared/forms/form.service';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { Helpers } from '../../../shared/utils/helpers';

@Component({
  selector: 'c-register-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TextInputComponent, ButtonComponent],
  templateUrl: './register-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [FormService]
})
export class RegisterFormComponent extends FormComponent<RegisterPayload, FormGroup<RegisterForm>> {
  protected override buildForm() {
    return this.fb.group({
      login: this.fb.control('', {validators: Validators.required}),
      email: this.fb.control('', {validators: Validators.required}),
      firstName: this.fb.control(''),
      lastName: this.fb.control(''),
      password: this.fb.control('', {validators: Validators.required}),
      confirmPassword: this.fb.control('', {validators: Validators.required})
    })
  }

  protected setEmittingValue() {
    return Helpers.removeProperty(this.form.getRawValue(), "confirmPassword");
  }
}
