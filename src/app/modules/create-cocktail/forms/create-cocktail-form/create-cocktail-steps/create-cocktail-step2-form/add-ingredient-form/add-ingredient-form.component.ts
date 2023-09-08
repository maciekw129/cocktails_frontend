import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '@app/shared/forms/form.component';
import { Ingredient } from '@app/modules/create-cocktail/create-cocktail.model';
import { IngredientForm } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/add-ingredient-form/add-ingredient-form.model';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextAutocompleteInputComponent } from '@app/shared/forms/controls/text-autocomplete-input/text-autocomplete-input';
import { SelectComponent } from '@app/shared/forms/controls/select/select';
import { TextInputComponent } from '@app/shared/forms/controls/text-input/text-input.component';
import { unitOptions } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/add-ingredient-form/add-ingredient-form.data';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { FormService } from '@app/shared/forms/form.service';
import { CheckboxComponent } from '@app/shared/forms/controls/checkbox/checkbox.component';
import { tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StopEventPropagationDirective } from '@app/shared/directives/stop-event-propagation.directive';
import { CreateCocktailStep2FormValidators } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/create-cocktail-step2-form.validators';

@Component({
  selector: 'c-add-ingredient-form',
  standalone: true,
  imports: [
    CommonModule,
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
      ({ ingredients }: { ingredients: Ingredient[] }) =>
        (this.ingredients = ingredients.map(ingredient => ingredient.name))
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
          CreateCocktailStep2FormValidators.uniqueIngredients(
            this.ingredientsControl
          ),
        ],
      }),
      quantity: this.fb.control(null, { validators: Validators.required }),
      unit: this.fb.control('', { validators: Validators.required }),
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
