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
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextareaInputComponent } from '@app/shared/forms/controls/textarea-input/textarea-input.component';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { MatButtonModule } from '@angular/material/button';
import { IngredientsTableComponent } from '@app/modules/create-cocktail/components/ingredients-table/ingredients-table.component';
import { TextAutocompleteInputComponent } from '@app/shared/forms/controls/text-autocomplete-input/text-autocomplete-input';
import { AddIngredientFormComponent } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/add-ingredient-form/add-ingredient-form.component';
import { MatCardModule } from '@angular/material/card';
import { CreateCocktailStep1FormComponent } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step1-form/create-cocktail-step1-form.component';
import { CreateCocktailStep2FormComponent } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/create-cocktail-step2-form.component';
import { CreateCocktailStep3FormComponent } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step3-form/create-cocktail-step3-form.component';
import { map, Observable } from 'rxjs';
import { SelectOptions } from '@app/shared/forms/controls/select/select';
import { Cocktail } from '@app/core/model/cocktails.model';

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
  extends FormComponent<Omit<Cocktail, 'id'>, FormGroup<CreateCocktailForm>>
  implements OnInit
{
  @ViewChild('stepper') stepper: MatStepper;

  ingredients$: Observable<SelectOptions<string>>;

  override ngOnInit() {
    super.ngOnInit();

    this.ingredients$ = this.form.controls.ingredients.valueChanges.pipe(
      map(ingredients =>
        ingredients.map(ingredient => {
          return { value: ingredient.name, label: ingredient.name };
        })
      )
    );
  }

  protected buildForm() {
    return this.fb.group<CreateCocktailForm>({
      name: this.fb.control(''),
      description: this.fb.control(''),
      imageUrl: this.fb.control(''),
      difficulty: this.fb.control(null),
      category: this.fb.control(null),
      preparation: this.fb.control([]),
      ingredients: this.fb.control([]),
    });
  }

  patchFormValue(value: Partial<Cocktail>) {
    this.form.patchValue(value);
  }

  protected setEmittingValue() {
    return this.form.getRawValue();
  }
}
