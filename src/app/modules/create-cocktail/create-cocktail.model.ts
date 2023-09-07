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

export enum Unit {
  g = 1,
  ml = 2,
  l = 3,
  pcs = 4,
}
