import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgForOf, NgIf } from '@angular/common';
import { ValidationErrorsDirective } from '@app/shared/forms/directives/validation-errors.directive';
import { CustomControl } from '@app/shared/forms/controls/custom-control';
import { MatSelectModule } from '@angular/material/select';
import { PrimitiveTypes } from '@angular/cli/src/analytics/analytics-parameters';

interface SelectOption<T> {
  value: T;
  label: string;
}

export type SelectOptions<T> = SelectOption<T>[];

@Component({
  selector: 'c-select',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    NgIf,
    ReactiveFormsModule,
    ValidationErrorsDirective,
    MatSelectModule,
    FormsModule,
    NgForOf,
    ValidationErrorsDirective,
  ],
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <mat-select [formControl]="control" [validationErrors]="validationErrors">
        <mat-option *ngFor="let option of options" [value]="option.value">
          {{ option.label }}
        </mat-option>
      </mat-select>
      <mat-error #validationErrors></mat-error>
    </mat-form-field>
  `,
  styles: ['mat-select {width: 180px; max-width: 180px}'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SelectComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends CustomControl<string> {
  @Input() label = '';
  @Input() placeholder = '';
  @Input() icon = '';
  @Input() hint = '';
  @Input() options: SelectOptions<unknown> = [];
}
