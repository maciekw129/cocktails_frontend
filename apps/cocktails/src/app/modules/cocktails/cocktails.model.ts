import { UserData } from '@src/app/auth/auth.model';

export interface Cocktail {
  name: string;
  imageUrl: string;
  description: string;
  category: Category;
  difficulty: Difficulty;
  preparation: PreparationStep[];
  ingredients: Ingredient[];
}

export interface CocktailApi extends Cocktail {
  id: number;
  author: UserData;
}

export interface CocktailsFilters {
  name: string;
  category: Category;
  difficulty: Difficulty;
  userId: string;
}

export enum Category {
  shot = 'SHOT',
  short = 'SHORT',
  long = 'LONG',
  other = 'OTHER',
}

export enum Difficulty {
  easy = 'EASY',
  medium = 'MEDIUM',
  hard = 'HARD',
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
  g = 'G',
  ml = 'ML',
  l = 'L',
  pcs = 'PCS',
  cup = 'CUP',
  tbsp = 'TBSP',
  tsp = 'TSP',
  pinch = 'PINCH',
}

export interface CocktailDetailState {
  cocktail: CocktailApi;
  ingredients: Ingredient[];
}

export interface CreateCocktailState {
  cocktail: Cocktail;
  ingredients: Ingredient[];
}
