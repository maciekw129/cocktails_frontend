import { Category } from '@app/core/model/cocktails.model';
import { SelectOptions } from '@app/shared/forms/controls/select/select';

export const categoryLables: Record<Category, string> = {
  [Category.shot]: 'Shot',
  [Category.short]: 'Short cocktail',
  [Category.long]: 'Long cocktail',
  [Category.other]: 'Other',
};

export const categoryOptions: SelectOptions<Category> = [
  { value: Category.shot, label: categoryLables[Category.shot] },
  { value: Category.short, label: categoryLables[Category.short] },
  { value: Category.long, label: categoryLables[Category.long] },
  { value: Category.other, label: categoryLables[Category.other] },
];
