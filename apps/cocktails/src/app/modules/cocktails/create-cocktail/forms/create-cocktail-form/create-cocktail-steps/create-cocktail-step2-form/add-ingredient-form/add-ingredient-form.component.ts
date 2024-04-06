import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { FormComponent } from '@src/app/shared/forms/form.component';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '@cocktails-ui';
import { FormService } from '@src/app/shared/forms/form.service';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StopEventPropagationDirective } from '@src/app/shared/directives/stop-event-propagation.directive';
import { Ingredient } from '@app/modules/cocktails/cocktails.model';
import { IngredientForm } from '@app/modules/cocktails/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/add-ingredient-form/add-ingredient-form.model';
import { unitOptions } from '@app/modules/cocktails/cocktails.data';
import { CreateCocktailStep2FormValidators } from '@app/modules/cocktails/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/create-cocktail-step2-form.validators';
import { limit } from '@app/modules/cocktails/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/add-ingredient-form/add-ingredient-form.data';
import {
  CheckboxComponent,
  SelectComponent,
  TextAutocompleteInputComponent,
  TextInputComponent,
} from '@cocktails-ui';

@Component({
  selector: 'c-add-ingredient-form',
  standalone: true,
  imports: [
    TextAutocompleteInputComponent,
    ReactiveFormsModule,
    SelectComponent,
    TextInputComponent,
    ButtonComponent,
    CheckboxComponent,
    StopEventPropagationDirective,
  ],
  templateUrl: './add-ingredient-form.component.html',
  providers: [FormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddIngredientFormComponent extends FormComponent<
  Ingredient,
  FormGroup<IngredientForm>
> {
  @Input() ingredientsControl: FormControl<Ingredient[]>;

  private activatedRoute = inject(ActivatedRoute);

  unitOptions = unitOptions;
  ingredients: string[];

  resolve$ = this.activatedRoute.data.pipe(
    tap(
      (data: Partial<{ ingredients: Ingredient[] }>) =>
        (this.ingredients = data.ingredients.map(ingredient => ingredient.name))
    )
  );

  override ngOnInit() {
    super.ngOnInit();
    this.resolve$.subscribe();
  }

  protected buildForm() {
    return this.fb.group<IngredientForm>({
      name: this.fb.control('', {
        validators: [
          Validators.required,
          CreateCocktailStep2FormValidators.uniqueIngredients(this.ingredientsControl),
        ],
      }),
      quantity: this.fb.control(null, {
        validators: [Validators.required, Validators.min(limit.minQuantity)],
      }),
      unit: this.fb.control(null, { validators: Validators.required }),
      isAlcoholic: this.fb.control(false, { validators: Validators.required }),
    });
  }

  protected setEmittingValue() {
    return this.form.getRawValue();
  }

  protected override afterSubmit() {
    this.resetForm();
  }
}
