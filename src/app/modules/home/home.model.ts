import {Category, CocktailListItem, Difficulty, PageMeta} from '@src/app/core/model/cocktails.model';

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
