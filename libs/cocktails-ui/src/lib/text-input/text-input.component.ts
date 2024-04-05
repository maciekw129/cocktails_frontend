import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorsDirective } from '@app/shared/forms/directives/validation-errors.directive';
import { FormControlAbstract } from '../shared/form-control.abstract';

@Component({
  selector: 'c-ui-text-input',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    ReactiveFormsModule,
    ValidationErrorsDirective,
  ],
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <input
        [formControl]="formControl"
        [validationErrors]="validationErrors"
        matInput
        [placeholder]="placeholder"
        type="text" />
      @if (icon) {
      <mat-icon matSuffix [fontIcon]="icon"></mat-icon>
      }
      <mat-hint>{{ hint }}</mat-hint>
      <mat-error #validationErrors></mat-error>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent extends FormControlAbstract<string> {
  @Input() icon: string;
  @Input() hint: string;
}
