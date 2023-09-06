import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  inject,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddIngredientFormComponent } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/add-ingredient-form/add-ingredient-form.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IngredientsTableComponent } from '@app/modules/create-cocktail/components/ingredients-table/ingredients-table.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { FormComponent } from '@app/shared/forms/form.component';
import { FormService } from '@app/shared/forms/form.service';
import {
  CreateCocktailStep2,
  CreateCocktailStep2Form,
} from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/create-cocktail-step2-form.model';
import { CreateCocktailStep2FormValidators } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/create-cocktail-step2-form.validators';
import { Ingredient } from '@app/modules/create-cocktail/create-cocktail.model';
import { Observable, startWith, tap } from 'rxjs';
import { ConfirmationDialogService } from '@app/shared/components/confirmation-dialog/confirmation-dialog.service';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { StopEventPropagationDirective } from '@app/shared/directives/stop-event-propagation.directive';
import { CustomErrorsComponent } from '@app/shared/forms/components/custom-error/custom-errors.component';

@Component({
  selector: 'c-create-cocktail-step2-form',
  standalone: true,
  imports: [
    CommonModule,
    AddIngredientFormComponent,
    FormsModule,
    IngredientsTableComponent,
    MatButtonModule,
    MatCardModule,
    MatStepperModule,
    ReactiveFormsModule,
    ButtonComponent,
    StopEventPropagationDirective,
    CustomErrorsComponent,
  ],
  templateUrl: './create-cocktail-step2-form.component.html',
  providers: [FormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCocktailStep2FormComponent
  extends FormComponent<CreateCocktailStep2, FormGroup<CreateCocktailStep2Form>>
  implements OnInit
{
  @Output() stepperBack = new EventEmitter<void>();

  private confirmationDialogService = inject(ConfirmationDialogService);

  ingredients$: Observable<Ingredient[]>;

  get ingredientsControl() {
    return this.form.controls.ingredients;
  }

  override ngOnInit() {
    super.ngOnInit();

    this.ingredients$ = this.ingredientsControl.valueChanges.pipe(
      startWith([])
    );
  }

  protected buildForm() {
    return this.fb.group<CreateCocktailStep2Form>({
      ingredients: this.fb.control([], {
        validators: CreateCocktailStep2FormValidators.requiredIngredients(),
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

  emitStepperBack() {
    this.stepperBack.emit();
  }

  protected setEmittingValue() {
    return this.form.getRawValue();
  }
}
