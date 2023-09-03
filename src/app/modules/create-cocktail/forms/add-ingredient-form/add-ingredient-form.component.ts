import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '@app/shared/forms/form.component';
import { Ingredient } from '@app/modules/create-cocktail/create-cocktail.model';
import { IngredientForm } from '@app/modules/create-cocktail/forms/add-ingredient-form/add-ingredient-form.model';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextAutocompleteInputComponent } from '@app/shared/forms/controls/text-autocomplete-input/text-autocomplete-input';
import { SelectComponent } from '@app/shared/forms/controls/select/select';
import { TextInputComponent } from '@app/shared/forms/controls/text-input/text-input.component';
import { unitOptions } from '@app/modules/create-cocktail/forms/add-ingredient-form/add-ingredient-form.data';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { FormService } from '@app/shared/forms/form.service';
import { CheckboxComponent } from '@app/shared/forms/controls/checkbox/checkbox.component';

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
  ],
  templateUrl: './add-ingredient-form.component.html',
  providers: [FormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddIngredientFormComponent extends FormComponent<
  Ingredient,
  FormGroup<IngredientForm>
> {
  unitOptions = unitOptions;

  protected buildForm() {
    return this.fb.group<IngredientForm>({
      name: this.fb.control('', { validators: Validators.required }),
      quantity: this.fb.control('', { validators: Validators.required }),
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
