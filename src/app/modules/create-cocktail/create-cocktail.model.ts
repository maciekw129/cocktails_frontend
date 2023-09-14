import { PreparationStep } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-steps/create-cocktail-step3-form/create-cocktail-step3-form.model';

export interface Cocktail {
  name: string;
  description: string;
  preparation: PreparationStep[];
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  quantity: number;
  unit: string;
  isAlcoholic: boolean;
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
