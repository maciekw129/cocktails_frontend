import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '../../../shared/forms/controls/text-input/text-input.component';
import {
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginForm } from './login-form.model';
import { LoginPayload } from '../../auth.model';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { CommonValidators } from '../../../shared/forms/validators/common-validators';

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
export class LoginFormComponent implements OnInit {
  @Output() loginFormSubmit = new EventEmitter<LoginPayload>();
  private fb = inject(NonNullableFormBuilder);

  form!: FormGroup<LoginForm>;

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group<LoginForm>({
      email: this.fb.control('', {
        validators: [Validators.required, CommonValidators.emailValidator()],
      }),
      password: this.fb.control('', { validators: Validators.required }),
    });
  }

  public handleSubmit() {
    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    this.loginFormSubmit.emit(this.form.getRawValue());
  }
}
