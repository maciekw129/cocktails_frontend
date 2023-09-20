import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from '@app/shared/forms/form.component';
import {
  CreateCocktailStep3,
  CreateCocktailStep3Form,
  PreparationStepForm,
} from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step3-form/create-cocktail-step3-form.model';
import { FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatListModule } from '@angular/material/list';
import {
  SelectComponent,
  SelectOptions,
} from '@app/shared/forms/controls/select/select';
import { FormService } from '@app/shared/forms/form.service';
import { TextInputComponent } from '@app/shared/forms/controls/text-input/text-input.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ConfirmationDialogService } from '@app/shared/components/confirmation-dialog/confirmation-dialog.service';
import { map, Observable, tap } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { CreateCocktailStep3FormValidators } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step3-form/create-cocktail-step3-form.validators';
import { CustomErrorsComponent } from '@app/shared/forms/components/custom-error/custom-errors.component';
import { actionSelectOptions } from '@app/core/data/action.data';
import { Ingredient } from '@app/core/model/cocktails.model';

@Component({
  selector: 'c-create-cocktail-step3-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatListModule,
    SelectComponent,
    TextInputComponent,
    ButtonComponent,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    CustomErrorsComponent,
  ],
  templateUrl: './create-cocktail-step3-form.component.html',
  styleUrls: ['./create-cocktail-step3-form.component.scss'],
  providers: [FormService],
})
export class CreateCocktailStep3FormComponent
  extends FormComponent<CreateCocktailStep3, FormGroup<CreateCocktailStep3Form>>
  implements OnInit
{
  @Output() stepperBack = new EventEmitter<void>();
  @Output() submitParentForm = new EventEmitter<void>();
  @Input() ingredients$: Observable<Ingredient[]>;

  private confirmationDialogService = inject(ConfirmationDialogService);
  private cdr = inject(ChangeDetectorRef);

  actionOptions = actionSelectOptions;

  ingredientsOpions$: Observable<SelectOptions<string>>;

  get preparationArray() {
    return this.form.controls.preparation;
  }

  override ngOnInit() {
    super.ngOnInit();

    this.ingredientsOpions$ = this.ingredients$.pipe(
      map(ingredients =>
        ingredients.map(ingredient => {
          return { value: ingredient.name, label: ingredient.name };
        })
      )
    );
  }

  protected buildForm() {
    return this.fb.group<CreateCocktailStep3Form>({
      preparation: this.fb.array<FormGroup<PreparationStepForm>>(
        [this.createPreparationStepGroup(1)],
        {
          validators:
            CreateCocktailStep3FormValidators.requiredPreparationSteps(),
        }
      ),
    });
  }

  createPreparationStepGroup(
    stepNumber: number
  ): FormGroup<PreparationStepForm> {
    return this.fb.group({
      step: this.fb.control(stepNumber),
      ingredient: this.fb.control(''),
      action: this.fb.control(null, { validators: Validators.required }),
      tip: this.fb.control(''),
    });
  }

  handleAddStepGroup() {
    const stepNumber = this.preparationArray.length + 1;
    this.preparationArray.push(this.createPreparationStepGroup(stepNumber));
  }

  handleRemoveStep(index: number) {
    this.confirmationDialogService
      .openConfirmationDialog$()
      .pipe(
        tap(() => {
          this.preparationArray.removeAt(index);
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

  protected setEmittingValue() {
    return this.form.getRawValue();
  }

  protected override afterSubmit() {
    this.submitParentForm.emit();
  }

  emitStepperBack() {
    this.stepperBack.emit();
  }
}
