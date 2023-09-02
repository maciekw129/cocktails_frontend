import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CustomControl } from '@app/shared/forms/controls/custom-control';
import { MatInputModule } from '@angular/material/input';
import { ValidationErrorsDirective } from '@app/shared/forms/directives/validation-errors.directive';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'c-textarea-input',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    ValidationErrorsDirective,
    MatIconModule,
    ReactiveFormsModule,
  ],
  template: `
    <mat-form-field class="margin-bottom-3">
      <mat-label>{{ label }}</mat-label>
      <textarea
        [formControl]="control"
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
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextareaInputComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextareaInputComponent extends CustomControl<string> {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() hint = '';
  @Input() minRows = 5;
  @Input() maxRows = 15;
}
