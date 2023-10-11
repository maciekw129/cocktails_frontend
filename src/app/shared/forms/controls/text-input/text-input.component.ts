import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgClass, NgIf } from '@angular/common';
import { ValidationErrorsDirective } from '@src/app/shared/forms/directives/validation-errors.directive';
import { CustomControl } from '@src/app/shared/forms/controls/custom-control';

@Component({
  selector: 'c-text-input',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    NgIf,
    ReactiveFormsModule,
    ValidationErrorsDirective,
    NgClass,
  ],
  template: `
    <mat-form-field [ngClass]="{ 'margin-bottom-3': hasBottomMargin }">
      <mat-label>{{ label }}</mat-label>
      <input
        [formControl]="control"
        [validationErrors]="validationErrors"
        matInput
        [placeholder]="placeholder"
        [type]="type" />
      <mat-icon *ngIf="icon" matSuffix>{{ icon }}</mat-icon>
      <mat-hint>{{ hint }}</mat-hint>
      <mat-error #validationErrors></mat-error>
    </mat-form-field>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextInputComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputComponent extends CustomControl<string> {
  @Input() label = '';
  @Input() icon = '';
  @Input() hint = '';
  @Input() hasBottomMargin = true;
}
