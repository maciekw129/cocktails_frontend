import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '@app/shared/forms/controls/text-input/text-input.component';
import { FormService } from '@app/shared/forms/form.service';
import { FormComponent } from '@app/shared/forms/form.component';
import {
  CreateCocktailForm,
  Step1Form,
  Step2Form,
  Step3Form,
} from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-form.model';
import {
  Cocktail,
  Ingredient,
} from '@app/modules/create-cocktail/create-cocktail.model';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextareaInputComponent } from '@app/shared/forms/controls/textarea-input/textarea-input.component';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { IngredientsTableComponent } from '@app/modules/create-cocktail/components/ingredients-table/ingredients-table.component';
import { TextAutocompleteInputComponent } from '@app/shared/forms/controls/text-autocomplete-input/text-autocomplete-input';
import { AddIngredientFormComponent } from '@app/modules/create-cocktail/forms/add-ingredient-form/add-ingredient-form.component';
import { MatCardModule } from '@angular/material/card';
import { ConfirmationDialogService } from '@app/shared/components/confirmation-dialog/confirmation-dialog.service';
import { BehaviorSubject, map, Observable, startWith, take, tap } from 'rxjs';
import { CreateCocktailFormValidators } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-form.validators';
import { CreateCocktailStep1FormComponent } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step1-form/create-cocktail-step1-form.component';

@Component({
  selector: 'c-create-cocktail-form',
  standalone: true,
  imports: [
    CommonModule,
    TextInputComponent,
    ReactiveFormsModule,
    TextareaInputComponent,
    MatStepperModule,
    MatInputModule,
    ButtonComponent,
    MatButtonModule,
    IngredientsTableComponent,
    TextAutocompleteInputComponent,
    AddIngredientFormComponent,
    MatCardModule,
    CreateCocktailStep1FormComponent,
  ],
  providers: [FormService],
  templateUrl: './create-cocktail-form.component.html',
  styleUrls: ['./create-cocktail-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCocktailFormComponent
  extends FormComponent<Cocktail, FormGroup<CreateCocktailForm>>
  implements OnInit
{
  @ViewChild('stepper') stepper: MatStepper;

  private confirmationDialogService = inject(ConfirmationDialogService);

  ingredients$: Observable<Ingredient[]>;

  get step1Group() {
    return this.form.controls.step1;
  }

  get step2Group() {
    return this.form.controls.step2;
  }

  get step3Group() {
    return this.form.controls.step3;
  }

  get ingredientsControl() {
    return this.form.controls.step2.controls.ingredients;
  }

  override ngOnInit() {
    super.ngOnInit();
    this.ingredients$ = this.ingredientsControl.valueChanges.pipe(
      startWith([])
    );
  }

  protected buildForm() {
    return this.fb.group<CreateCocktailForm>({
      step1: this.fb.group<Step1Form>({
        name: this.fb.control('', { validators: [Validators.required] }),
        description: this.fb.control('', { validators: [Validators.required] }),
      }),
      step2: this.fb.group<Step2Form>({
        ingredients: this.fb.control<Ingredient[]>([], {
          validators: [CreateCocktailFormValidators.requiredIngredients()],
        }),
      }),
      step3: this.fb.group<Step3Form>({
        preparation: this.fb.control(''),
      }),
    });
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredientsControl.setValue([
      ...this.ingredientsControl.value,
      ingredient,
    ]);
  }

  removeIngredient(ingredient: Ingredient) {
    this.confirmationDialogService
      .openConfirmationDialog$()
      .pipe(
        tap(() => {
          this.ingredientsControl.setValue(
            this.ingredientsControl.value.filter(
              ({ name }) => name !== ingredient.name
            )
          );
        })
      )
      .subscribe();
  }

  nextStep() {
    this.stepper.next();
  }

  protected setEmittingValue(): any {
    return this.form.getRawValue();
  }
}
