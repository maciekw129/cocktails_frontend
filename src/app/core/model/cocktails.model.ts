export interface CocktailApi extends Cocktail {
  data: Cocktail[];
  meta: PageMeta;
}

export interface Cocktail {
  id: string;
  name: string;
  imageUrl: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  preparation: PreparationStep[];
  ingredients: Ingredient[];
}

export interface PageMeta {
  page: number;
  take: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export enum Category {
  shot = 1,
  short = 2,
  long = 3,
  other = 4,
}

export enum Difficulty {
  easy = 1,
  medium = 2,
  hard = 3,
}

export interface PreparationStep {
  step: number;
  ingredient: string;
  action: Action;
  tip: string;
}

export enum Action {
  ADD = 'ADD',
  POUR = 'POUR',
  MIX = 'MIX',
  DECORATE = 'DECORATE',
  WAIT = 'WAIT',
  SQUEEZE = 'SQUEEZE',
  SHAKE = 'SHAKE',
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: Unit;
  isAlcoholic: boolean;
}

export enum Unit {
  g = 1,
  ml = 2,
  l = 3,
  pcs = 4,
  cup = 5,
  tbsp = 6,
  tsp = 7,
  pinch = 8,
}
