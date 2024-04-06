import { FormControlAbstract } from '../shared/form-control.abstract';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  MatError,
  MatFormField,
  MatHint,
  MatLabel,
  MatSuffix,
} from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorsDirective } from '@app/shared/forms/directives/validation-errors.directive';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'c-ui-number-input',
  standalone: true,
  imports: [
    MatError,
    MatFormField,
    MatHint,
    MatIcon,
    MatInput,
    MatLabel,
    MatSuffix,
    ReactiveFormsModule,
    ValidationErrorsDirective,
    NgxMaskDirective,
  ],
  templateUrl: 'number-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberInputComponent extends FormControlAbstract<number> {
  public icon = input<string>(null);
  public hint = input<string>(null);
}
