import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatStepperModule } from '@angular/material/stepper';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TextInputComponent } from '@src/app/shared/forms/controls/text-input/text-input.component';
import { TextareaInputComponent } from '@src/app/shared/forms/controls/textarea-input/textarea-input.component';
import { FormComponent } from '@src/app/shared/forms/form.component';
import { FormService } from '@src/app/shared/forms/form.service';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { SelectComponent } from '@src/app/shared/forms/controls/select/select';
import {
  CreateCocktailStep1,
  CreateCocktailStep1Form,
} from '@app/modules/cocktails/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step1-form/create-cocktail-step1-form.model';
import {
  categoryOptions,
  difficultyOptions,
} from '@app/modules/cocktails/cocktails.data';

@Component({
  selector: 'c-create-cocktail-step1-form',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatStepperModule,
    ReactiveFormsModule,
    TextInputComponent,
    TextareaInputComponent,
    ButtonComponent,
    SelectComponent,
  ],
  templateUrl: 'create-cocktail-step1-form.component.html',
  providers: [FormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCocktailStep1FormComponent extends FormComponent<
  CreateCocktailStep1,
  FormGroup<CreateCocktailStep1Form>
> {
  categoryOptions = categoryOptions;
  difficultyOptions = difficultyOptions;

  protected buildForm() {
    return this.fb.group<CreateCocktailStep1Form>({
      name: this.fb.control('', { validators: Validators.required }),
      description: this.fb.control(''),
      imageUrl: this.fb.control('', { validators: Validators.required }),
      category: this.fb.control(null, { validators: Validators.required }),
      difficulty: this.fb.control(null, { validators: Validators.required }),
    });
  }

  protected setEmittingValue() {
    return this.form.getRawValue();
  }
}
