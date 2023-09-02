import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { AsyncPipe, NgForOf, NgIf } from '@angular/common';
import { ValidationErrorsDirective } from '@app/shared/forms/directives/validation-errors.directive';
import { CustomControl } from '@app/shared/forms/controls/custom-control';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'c-autocomplete-input',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    NgIf,
    ReactiveFormsModule,
    ValidationErrorsDirective,
    MatAutocompleteModule,
    AsyncPipe,
    NgForOf,
  ],
  template: `
    <mat-form-field class="margin-bottom-3">
      <mat-label>{{ label }}</mat-label>
      <input
        type="text"
        [placeholder]="placeholder"
        matInput
        [formControl]="control"
        [matAutocomplete]="auto" />
      <mat-autocomplete autoActiveFirstOption #auto="matAutocomplete">
        <mat-option
          *ngFor="let option of filteredOptions | async"
          [value]="option">
          {{ option }}
        </mat-option>
      </mat-autocomplete>
      <mat-icon *ngIf="icon" matSuffix>{{ icon }}</mat-icon>
      <mat-hint>{{ hint }}</mat-hint>
      <mat-error #validationErrors></mat-error>
    </mat-form-field>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: TextAutocompleteInputComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAutocompleteInputComponent
  extends CustomControl<string>
  implements OnInit
{
  @Input() label = '';
  @Input() placeholder = '';
  @Input() icon = '';
  @Input() hint = '';
  @Input() options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  override ngOnInit() {
    super.ngOnInit();
    this.filteredOptions = this.control.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
