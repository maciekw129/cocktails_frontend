import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { CustomControl } from '../custom-control.abstract';
import { ValidationErrorsComponent } from '../validation-errors/validation-errors.component';

@Component({
  selector: 'c-text-input',
  standalone: true,
  imports: [
    MatInputModule,
    MatIconModule,
    NgIf,
    ReactiveFormsModule,
    ValidationErrorsComponent,
  ],
  template: `
    <mat-form-field class="margin-bottom-3" appearance="outline">
      <mat-label>{{ label }}</mat-label>
      <input [formControl]="control" matInput [placeholder]="placeholder" />
      <mat-icon *ngIf="icon" matSuffix>{{ icon }}</mat-icon>
      <mat-hint>{{ hint }}</mat-hint>
      <mat-error *ngIf="control.touched">
        <c-validation-errors [errors]="control.errors"></c-validation-errors>
      </mat-error>
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
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() icon: string = '';
  @Input() hint: string = '';
}
