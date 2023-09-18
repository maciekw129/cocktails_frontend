import { Category, Difficulty } from '@app/core/model/cocktails.model';

export interface Filters {
  name: string;
  category: Category;
  difficulty: Difficulty;
}
