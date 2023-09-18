import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
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
import { map, Observable } from 'rxjs';
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
  styleUrls: ['./filters-form.component.scss'],
  providers: [FormService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FiltersFormComponent extends FormComponent<
  Filters,
  FormGroup<FiltersForm>
> {
  private activatedRoute = inject(ActivatedRoute);

  categoryOptions = categoryOptions;
  difficultyOptions = difficultyOptions;

  ingredientsOptions$: Observable<SelectOptions<string>> =
    this.activatedRoute.data.pipe(
      map(({ ingredients }: { ingredients: Ingredient[] }) => {
        return ingredients.map(({ name }) => {
          return { value: name, label: name };
        });
      })
    );

  protected buildForm(): FormGroup<FiltersForm> {
    return this.fb.group<FiltersForm>({
      name: this.fb.control<string>(''),
      difficulty: this.fb.control<Difficulty>(null),
      category: this.fb.control<Category>(null),
      ingredients: this.fb.control<string>(''),
    });
  }

  protected setEmittingValue(): Filters {
    return this.form.getRawValue();
  }
}
