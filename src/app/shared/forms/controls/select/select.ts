import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import {
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgForOf, NgIf } from '@angular/common';
import { ValidationErrorsDirective } from '@src/app/shared/forms/directives/validation-errors.directive';
import { CustomControl } from '@src/app/shared/forms/controls/custom-control';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule,
  ],
  template: `
    <mat-form-field>
      <div matPrefix class="padding-1">
        <mat-spinner *ngIf="isLoading" diameter="20"></mat-spinner>
      </div>

      <mat-label>{{ label }}</mat-label>
      <mat-select
        [formControl]="control"
        [validationErrors]="validationErrors"
        [multiple]="multiple">
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
  @Input() icon = '';
  @Input() hint = '';
  @Input() options: SelectOptions<unknown> = [];
  @Input() multiple = false;
  @Input() isLoading: boolean;
}
