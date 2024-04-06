import { PaginatorFilterComponent } from '@app/shared/paginator/paginator-filter.component';
import {
  Category,
  Cocktail,
  CocktailsFilters,
  Difficulty,
} from '@app/modules/cocktails/cocktails.model';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  categoryOptions,
  difficultyOptions,
} from '@app/modules/cocktails/cocktails.data';
import { ButtonComponent } from '@cocktails-ui';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, finalize, map, Observable } from 'rxjs';
import { IngredientsApiService } from '@app/modules/cocktails/ingredients-api.service';
import { FormService } from '@app/shared/forms/form.service';
import { CocktailsFiltersForm } from '@app/modules/cocktails/cocktails-paginator-filter/cocktails-paginator-filter.model';
import { SelectComponent, SelectOption, TextInputComponent } from '@cocktails-ui';

@Component({
  selector: 'c-cocktails-paginator-filter',
  standalone: true,
  templateUrl: 'cocktails-paginator-filter.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextInputComponent,
    SelectComponent,
    ButtonComponent,
  ],
  providers: [FormService],
})
export class CocktailsPaginatorFilterComponent extends PaginatorFilterComponent<
  Cocktail,
  CocktailsFilters
> {
  private ingredientsApiService = inject(IngredientsApiService);

  protected readonly categoryOptions = categoryOptions;
  protected readonly difficultyOptions = difficultyOptions;

  public isIngredientsLoading$ = new BehaviorSubject(true);

  public ingredientsOptions$: Observable<SelectOption<string>[]> =
    this.ingredientsApiService.getSavedIngredients().pipe(
      map(ingredients => {
        return ingredients.map(({ name }) => {
          return { value: name, label: name };
        });
      }),
      finalize(() => this.isIngredientsLoading$.next(false))
    );

  protected override buildForm(): void {
    this.form = this.fb.group<CocktailsFiltersForm>({
      name: this.fb.control<string>(null),
      difficulty: this.fb.control<Difficulty>(null),
      category: this.fb.control<Category>(null),
      ingredients: this.fb.control<string>(null),
    });
  }
}
