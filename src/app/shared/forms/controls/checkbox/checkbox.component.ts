import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { CustomControl } from '@src/app/shared/forms/controls/custom-control';

@Component({
  selector: 'c-checkbox',
  standalone: true,
  imports: [CommonModule, MatCheckboxModule, ReactiveFormsModule],
  template: `
    <mat-checkbox [formControl]="control">{{ label }}</mat-checkbox>
  `,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CheckboxComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckboxComponent extends CustomControl<boolean> {
  @Input() label = '';
}
