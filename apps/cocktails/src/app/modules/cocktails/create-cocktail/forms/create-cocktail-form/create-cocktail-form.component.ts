import { ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormService } from '@src/app/shared/forms/form.service';
import { FormComponent } from '@src/app/shared/forms/form.component';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatStepper, MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { ButtonComponent } from '@cocktails-ui';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Observable } from 'rxjs';
import { Cocktail, Ingredient } from '@app/modules/cocktails/cocktails.model';
import { IngredientsTableComponent } from '@app/modules/cocktails/create-cocktail/components/ingredients-table/ingredients-table.component';
import { AddIngredientFormComponent } from '@app/modules/cocktails/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/add-ingredient-form/add-ingredient-form.component';
import { CreateCocktailStep1FormComponent } from '@app/modules/cocktails/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step1-form/create-cocktail-step1-form.component';
import { CreateCocktailStep2FormComponent } from '@app/modules/cocktails/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step2-form/create-cocktail-step2-form.component';
import { CreateCocktailStep3FormComponent } from '@app/modules/cocktails/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step3-form/create-cocktail-step3-form.component';
import { CreateCocktailForm } from '@app/modules/cocktails/create-cocktail/forms/create-cocktail-form/create-cocktail-form.model';

@Component({
  selector: 'c-create-cocktail-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatStepperModule,
    MatInputModule,
    ButtonComponent,
    MatButtonModule,
    IngredientsTableComponent,
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
  extends FormComponent<Omit<Cocktail, 'id' | 'author'>, FormGroup<CreateCocktailForm>>
  implements OnInit
{
  @ViewChild('stepper') stepper: MatStepper;

  ingredients$: Observable<Ingredient[]>;

  override ngOnInit() {
    super.ngOnInit();

    this.ingredients$ = this.form.controls.ingredients.valueChanges;
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
