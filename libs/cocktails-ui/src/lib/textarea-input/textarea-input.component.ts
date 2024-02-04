import { FormControlAbstract } from '../shared/form-control.abstract';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TextFieldModule } from '@angular/cdk/text-field';
import { ValidationErrorsDirective } from '@app/shared/forms/directives/validation-errors.directive';

@Component({
  selector: 'c-ui-textarea-input',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    TextFieldModule,
    ValidationErrorsDirective,
  ],
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <textarea
        [formControl]="formControl"
        [validationErrors]="validationErrors"
        matInput
        [placeholder]="placeholder"
        [type]="type"
        cdkTextareaAutosize
        [cdkAutosizeMinRows]="minRows"
        [cdkAutosizeMaxRows]="maxRows"></textarea>
      <mat-hint>{{ hint }}</mat-hint>
      <mat-error #validationErrors></mat-error>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaInputComponent extends FormControlAbstract<string> {
  private readonly MIN_ROWS_DEFAULT_VALUE = 5;
  private readonly MAX_ROWS_DEFAULT_VALUE = 15;

  @Input() minRows = this.MIN_ROWS_DEFAULT_VALUE;
  @Input() maxRows = this.MAX_ROWS_DEFAULT_VALUE;
}
