import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControlAbstract } from '../shared/form-control.abstract';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorsDirective } from '@app/shared/forms/directives/validation-errors.directive';
import { defer, map, startWith } from 'rxjs';

@Component({
  selector: 'c-ui-text-autocomplete-input',
  standalone: true,
  imports: [
    CommonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule,
    ValidationErrorsDirective,
  ],
  template: `
    <mat-form-field>
      <mat-label>{{ label }}</mat-label>
      <input
        [type]="type"
        [placeholder]="placeholder"
        matInput
        [formControl]="formControl"
        [matAutocomplete]="auto"
        [validationErrors]="validationErrors" />
      <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
        <mat-option *ngFor="let option of filteredOptions$ | async" [value]="option">
          {{ option }}
        </mat-option>
      </mat-autocomplete>
      <mat-icon *ngIf="icon" matSuffix>{{ icon }}</mat-icon>
      <mat-hint>{{ hint }}</mat-hint>
      <mat-error #validationErrors></mat-error>
    </mat-form-field>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAutocompleteInputComponent extends FormControlAbstract<string> {
  @Input() options: string[] = [];

  public filteredOptions$ = defer(() =>
    this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || ''))
    )
  );

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
