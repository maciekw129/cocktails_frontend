import {
  Category,
  CocktailListItem,
  Difficulty,
  PageMeta,
} from '@app/modules/cocktails/cocktails.model';

export interface Filters {
  name: string;
  category: Category;
  difficulty: Difficulty;
  userId: string;
}

export interface HomeState {
  cocktails: CocktailListItem[];
  pageMeta: PageMeta;
  filters: Partial<Filters>;
  page: number;
}
