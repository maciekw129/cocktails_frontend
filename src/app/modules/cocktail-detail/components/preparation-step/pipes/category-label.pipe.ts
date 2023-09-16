import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '@app/modules/create-cocktail/create-cocktail.model';
import { categoryLables } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step1-form/create-cocktail-step1-form.data';

@Pipe({
  name: 'categoryLabel',
  standalone: true,
})
export class CategoryLabelPipe implements PipeTransform {
  transform(value: Category): string {
    return categoryLables[value];
  }
}
