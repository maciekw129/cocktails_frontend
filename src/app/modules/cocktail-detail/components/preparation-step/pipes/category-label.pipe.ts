import { Pipe, PipeTransform } from '@angular/core';
import { categoryLables } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step1-form/create-cocktail-step1-form.data';
import { Category } from '@app/core/model/cocktails.model';

@Pipe({
  name: 'categoryLabel',
  standalone: true,
})
export class CategoryLabelPipe implements PipeTransform {
  transform(value: Category): string {
    return categoryLables[value];
  }
}
