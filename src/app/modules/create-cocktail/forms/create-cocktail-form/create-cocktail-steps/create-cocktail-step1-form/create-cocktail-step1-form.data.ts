import {
  Category,
  Difficulty,
} from '@app/modules/create-cocktail/create-cocktail.model';
import { SelectOptions } from '@app/shared/forms/controls/select/select';

export const categoryLables: Record<Category, string> = {
  [Category.shot]: 'Shot',
  [Category.short]: 'Short cocktail',
  [Category.long]: 'Long cocktail',
};

export const difficultyLabels: Record<Difficulty, string> = {
  [Difficulty.easy]: 'Easy',
  [Difficulty.medium]: 'Medium',
  [Difficulty.hard]: 'Hard',
};

export const categoryOptions: SelectOptions<Category> = [
  { value: Category.shot, label: categoryLables[Category.shot] },
  { value: Category.short, label: categoryLables[Category.short] },
  { value: Category.long, label: categoryLables[Category.long] },
];

export const difficultyOptions: SelectOptions<Difficulty> = [
  { value: Difficulty.easy, label: difficultyLabels[Difficulty.easy] },
  { value: Difficulty.medium, label: difficultyLabels[Difficulty.medium] },
  { value: Difficulty.hard, label: difficultyLabels[Difficulty.hard] },
];
