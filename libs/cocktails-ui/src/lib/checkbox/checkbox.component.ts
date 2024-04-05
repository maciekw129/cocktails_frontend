import { FormControlAbstract } from '../shared/form-control.abstract';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'c-ui-checkbox',
  standalone: true,
  imports: [MatCheckboxModule, ReactiveFormsModule],
  template: ` <mat-checkbox [formControl]="formControl">{{ label }}</mat-checkbox> `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends FormControlAbstract<boolean> {}
