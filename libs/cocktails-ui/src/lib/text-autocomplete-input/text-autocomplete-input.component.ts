import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { FormControlAbstract } from '../shared/form-control.abstract';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ValidationErrorsDirective } from '@app/shared/forms/directives/validation-errors.directive';
import { defer, map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'c-ui-text-autocomplete-input',
  standalone: true,
  imports: [
    MatAutocompleteModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatOptionModule,
    ReactiveFormsModule,
    ValidationErrorsDirective,
    AsyncPipe,
  ],
  templateUrl: 'text-autocomplete-input.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextAutocompleteInputComponent extends FormControlAbstract<string> {
  public options = input.required<string[]>();
  public icon = input<string>(null);
  public hint = input<string>(null);

  public filteredOptions$: Observable<string[]> = defer(() =>
    this.formControl.valueChanges.pipe(
      startWith(''),
      map(value => this.filter(value || ''))
    )
  );

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options().filter(option => option.toLowerCase().includes(filterValue));
  }
}
