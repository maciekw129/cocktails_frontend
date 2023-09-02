import { ResolveFn } from '@angular/router';
import { Ingredient } from '@app/modules/create-cocktail/create-cocktail.model';
import { inject } from '@angular/core';
import { CreateCocktailApiService } from '@app/modules/create-cocktail/create-cocktail-api.service';

export const ingredientsResolver: ResolveFn<Ingredient[]> = () => {
  return inject(CreateCocktailApiService).getSavedIngredients();
};
