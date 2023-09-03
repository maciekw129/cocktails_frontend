export interface Cocktail {
  name: string;
  description: string;
  preparation: string;
  ingredients: Ingredient[];
}

export interface Ingredient {
  name: string;
  quantity: string;
  unit: string;
  isAlcoholic: boolean;
}

export enum Unit {
  g = 1,
  ml = 2,
  l = 3,
  pcs = 4,
}
