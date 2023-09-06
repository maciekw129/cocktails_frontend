import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextInputComponent } from '@app/shared/forms/controls/text-input/text-input.component';
import { FormService } from '@app/shared/forms/form.service';
import { FormComponent } from '@app/shared/forms/form.component';
import { CreateCocktailForm } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-form.model';
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
import { AddIngredientFormComponent } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/add-ingredient-form/add-ingredient-form.component';
import { MatCardModule } from '@angular/material/card';
import { CreateCocktailStep2FormValidators } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/create-cocktail-step2-form.validators';
import { CreateCocktailStep1FormComponent } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step1-form/create-cocktail-step1-form.component';
import { CreateCocktailStep2FormComponent } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/create-cocktail-step2-form.component';
import { CreateCocktailStep1Form } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step1-form/create-cocktail-step1-form.model';
import { CreateCocktailStep2Form } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/create-cocktail-step2-form.model';
import { CreateCocktailStep3FormComponent } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step3-form/create-cocktail-step3-form.component';
import { map, Observable } from 'rxjs';
import { SelectOptions } from '@app/shared/forms/controls/select/select';

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
    CreateCocktailStep2FormComponent,
    CreateCocktailStep3FormComponent,
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

  get step1Group() {
    return this.form.controls.step1;
  }

  get step2Group() {
    return this.form.controls.step2;
  }

  get step3Group() {
    return this.form.controls.step3;
  }

  ingredients$: Observable<SelectOptions<Ingredient>>;

  override ngOnInit() {
    super.ngOnInit();

    this.ingredients$ =
      this.form.controls.step2.controls.ingredients.valueChanges.pipe(
        map(ingredients =>
          ingredients.map(ingredient => {
            return { value: ingredient, label: ingredient.name };
          })
        )
      );
  }

  protected buildForm() {
    return this.fb.group<CreateCocktailForm>({
      step1: this.fb.group<CreateCocktailStep1Form>({
        name: this.fb.control('', { validators: [Validators.required] }),
        description: this.fb.control('', { validators: [Validators.required] }),
      }),
      step2: this.fb.group<CreateCocktailStep2Form>({
        ingredients: this.fb.control<Ingredient[]>([], {
          validators: [CreateCocktailStep2FormValidators.requiredIngredients()],
        }),
      }),
      step3: this.fb.group<any>({
        preparation: this.fb.control(''),
      }),
    });
  }

  protected setEmittingValue(): any {
    return this.form.getRawValue();
  }
}
