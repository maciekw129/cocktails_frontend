import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ValidationErrors } from '@angular/forms';

@Component({
  selector: 'c-validation-errors',
  standalone: true,
  imports: [MatFormFieldModule, NgIf],
  template: `
    <ng-container *ngIf="errors">
      <ng-container *ngIf="errors['required']; else minLength"
        >This field is required.</ng-container
      >
      <ng-template #minLength>
        <mat-error *ngIf="errors['minlength'] as error; else maxLength"
          >This field must have at least
          {{ error.requiredLength }} characters.</mat-error
        >
      </ng-template>
      <ng-template #maxLength>
        <ng-container *ngIf="errors['maxlength'] as error; else emailPattern"
          >This field can have max.
          {{ error.requiredLength }} characters.</ng-container
        >
      </ng-template>
      <ng-template #emailPattern>
        <ng-container
          *ngIf="errors['emailPattern'] as error; else passwordPattern"
          >Format should be: name@domain.tld.</ng-container
        >
      </ng-template>
      <ng-template #passwordPattern>
        <ng-container
          *ngIf="errors['passwordPattern'] as error; else confirmPassword"
          >Password must have at least 8 characters.</ng-container
        >
      </ng-template>
      <ng-template #confirmPassword>
        <ng-container *ngIf="errors['confirmPassword'] as error"
          >Passwords don't match.</ng-container
        >
      </ng-template>
    </ng-container>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ValidationErrorsComponent implements OnInit {
  @Input() errors!: ValidationErrors | null;

  ngOnInit() {
    this.validateRequiredInputs();
  }

  private validateRequiredInputs() {
    if (this.errors === undefined)
      throw new Error(
        "Input 'errors' is required in validation-errors component."
      );
  }
}
