import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormService } from '@src/app/shared/forms/form.service';
import { FormComponent } from '@src/app/shared/forms/form.component';
import { Filters } from '@src/app/modules/home/home.model';
import { FiltersForm } from '@src/app/modules/home/forms/filters-form/filters-form.model';
import { Category, Difficulty } from '@src/app/core/model/cocktails.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '@src/app/shared/forms/controls/text-input/text-input.component';
import {
  SelectComponent,
  SelectOptions,
} from '@src/app/shared/forms/controls/select/select';
import { categoryOptions } from '@src/app/core/data/category.data';
import { difficultyOptions } from '@src/app/core/data/difficulty.data';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  distinctUntilChanged,
  finalize,
  map,
  Observable,
  take,
  tap,
} from 'rxjs';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { IngredientsApiService } from '@app/core/services/ingredients-api.service';

@Component({
  selector: 'c-filters-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    SelectComponent,
    ButtonComponent,
  ],
  templateUrl: './filters-form.component.html',
  providers: [FormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersFormComponent
  extends FormComponent<Partial<Filters>, FormGroup<FiltersForm>>
  implements OnInit
{
  private activatedRoute = inject(ActivatedRoute);
  private ingredientsApiService = inject(IngredientsApiService);

  categoryOptions = categoryOptions;
  difficultyOptions = difficultyOptions;
  isSubmitDisabled$ = new BehaviorSubject<boolean>(true);
  isIngredientsLoading$ = new BehaviorSubject(true);

  get ingredientsControl() {
    return this.form.controls.ingredients;
  }

  ingredientsOptions$: Observable<SelectOptions<string>> =
    this.ingredientsApiService.getSavedIngredients().pipe(
      map(ingredients => {
        return ingredients.map(({ name }) => {
          return { value: name, label: name };
        });
      }),
      finalize(() => {
        this.isIngredientsLoading$.next(false);
        this.ingredientsControl.enable();
      })
    );

  protected buildForm() {
    return this.fb.group<FiltersForm>({
      name: this.fb.control<string>(null),
      difficulty: this.fb.control<Difficulty>(null),
      category: this.fb.control<Category>(null),
      ingredients: this.fb.control<string>({ value: null, disabled: true }),
    });
  }

  override ngOnInit() {
    super.ngOnInit();
    this.initializeFilters();
    this.manageFilterDisabledState().subscribe();
  }

  private initializeFilters() {
    const { queryParams } = this.activatedRoute.snapshot;

    this.form.patchValue({
      name: queryParams['name'] ?? null,
      difficulty: queryParams['difficulty']
        ? Number(queryParams['difficulty'])
        : null,
      category: queryParams['category']
        ? Number(queryParams['category'])
        : null,
      ingredients: queryParams['ingredients'] ?? null,
    });
  }

  public clearFilters() {
    this.form.reset();
  }

  private manageFilterDisabledState() {
    return this.form.valueChanges.pipe(
      distinctUntilChanged(),
      take(1),
      tap(() => this.isSubmitDisabled$.next(false))
    );
  }

  protected setEmittingValue() {
    const formValues = { ...this.form.getRawValue() };

    Object.keys(formValues).forEach((key: keyof typeof formValues) => {
      if (!formValues[key]) delete formValues[key];
    });

    return formValues;
  }

  protected override afterSubmit() {
    this.form.enable();
    this.isSubmitDisabled$.next(true);
    this.manageFilterDisabledState().subscribe();
  }
}
