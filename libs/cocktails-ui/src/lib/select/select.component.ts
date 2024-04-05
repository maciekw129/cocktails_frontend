import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { ValidationErrorsDirective } from '@app/shared/forms/directives/validation-errors.directive';
import { SelectOption } from './select.model';
import { ReactiveFormsModule } from '@angular/forms';
import { FormControlAbstract } from '../shared/form-control.abstract';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'c-ui-select',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule,
    ValidationErrorsDirective,
    MatIconModule,
  ],
  template: `
    <mat-form-field>
      <div matPrefix class="padding-1">
        @if (isLoading) {
        <mat-spinner [diameter]="SPINNER_DIAMETER"></mat-spinner>
        }
      </div>

      <mat-label>{{ label }}</mat-label>
      <mat-select
        [formControl]="formControl"
        [validationErrors]="validationErrors"
        [multiple]="multiple">
        @for (option of options; track option) {
        <mat-option [value]="option.value">
          {{ option.label }}
        </mat-option>
        }
      </mat-select>
      <mat-error #validationErrors></mat-error>
      <mat-hint>{{ hint }}</mat-hint>
      @if (icon) {
      <mat-icon matSuffix [fontIcon]="icon" />
      }
    </mat-form-field>
  `,
  styleUrls: ['select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent extends FormControlAbstract<string> {
  public readonly SPINNER_DIAMETER = 20;

  @Input() isLoading = false;
  @Input() multiple = false;
  @Input({ required: true }) options: SelectOption<unknown>[] = [];
  @Input() icon: string;
  @Input() hint: string;
}
