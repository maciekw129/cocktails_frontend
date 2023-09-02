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
