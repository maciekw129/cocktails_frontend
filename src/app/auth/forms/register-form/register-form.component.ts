import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../../../shared/forms/form-component';
import { RegisterPayload } from '../../auth.model';
import { RegisterForm } from './register-form.model';
import { FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'c-register-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RegisterFormComponent {
}
