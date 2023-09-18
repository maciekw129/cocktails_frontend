import { Pipe, PipeTransform } from '@angular/core';
import { Category } from '@app/core/model/cocktails.model';
import { categoryLables } from '@app/core/data/category.data';

@Pipe({
  name: 'categoryLabel',
  standalone: true,
})
export class CategoryLabelPipe implements PipeTransform {
  transform(value: Category): string {
    return categoryLables[value];
  }
}
