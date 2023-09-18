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
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
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
  styleUrls: ['./filters-form.component.scss'],
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
    return this.fb.group<FiltersForm>({
      name: this.fb.control<string>(''),
      difficulty: this.fb.control<Difficulty>(null),
      category: this.fb.control<Category>(null),
      ingredients: this.fb.control<string>(''),
    });
  }

  override ngOnInit() {
    super.ngOnInit();
    this.manageFilterDisabledState().subscribe();
  }

  public clearFilters() {
    this.form.reset(undefined, { emitEvent: false });
  }

  private manageFilterDisabledState() {
    return this.form.valueChanges.pipe(
      distinctUntilChanged(),
      take(1),
      tap(() => this.isSubmitDisabled$.next(false))
    );
  }

  protected setEmittingValue() {
    Object.values(this.form.controls).forEach((control: FormControl) => {
      if (!control.value) control.disable({ emitEvent: false });
    });

    return this.form.value;
  }

  protected override afterSubmit() {
    this.form.enable();
    this.isSubmitDisabled$.next(true);
    this.manageFilterDisabledState().subscribe();
  }
}
