import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormService } from '@app/shared/forms/form.service';
import { FormComponent } from '@app/shared/forms/form.component';
import { Filters } from '@app/modules/home/home.model';
import { FiltersForm } from '@app/modules/home/forms/filters-form/filters-form.model';
import {
  Category,
  Difficulty,
  Ingredient,
} from '@app/core/model/cocktails.model';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TextInputComponent } from '@app/shared/forms/controls/text-input/text-input.component';
import {
  SelectComponent,
  SelectOptions,
} from '@app/shared/forms/controls/select/select';
import { categoryOptions } from '@app/core/data/category.data';
import { difficultyOptions } from '@app/core/data/difficulty.data';
import { ActivatedRoute } from '@angular/router';
import {
  BehaviorSubject,
  distinctUntilChanged,
  map,
  Observable,
  take,
  tap,
} from 'rxjs';
import { ButtonComponent } from '@app/shared/components/button/button.component';

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

  categoryOptions = categoryOptions;
  difficultyOptions = difficultyOptions;
  isSubmitDisabled$ = new BehaviorSubject<boolean>(true);

  ingredientsOptions$: Observable<SelectOptions<string>> =
    this.activatedRoute.data.pipe(
      map(({ ingredients }: { ingredients: Ingredient[] }) => {
        return ingredients.map(({ name }) => {
          return { value: name, label: name };
        });
      })
    );

  protected buildForm() {
    const { queryParams } = this.activatedRoute.snapshot;

    return this.fb.group<FiltersForm>({
      name: this.fb.control<string>(queryParams['name'] ?? null),
      difficulty: this.fb.control<Difficulty>(
        Number(queryParams['difficulty']) ?? null
      ),
      category: this.fb.control<Category>(
        Number(queryParams['category']) ?? null
      ),
      ingredients: this.fb.control<string>(queryParams['ingredients'] ?? null),
    });
  }

  override ngOnInit() {
    super.ngOnInit();
    this.manageFilterDisabledState().subscribe();
  }

  public clearFilters() {
    this.form.reset(undefined);
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
