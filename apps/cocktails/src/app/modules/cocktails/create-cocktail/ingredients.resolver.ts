import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Ingredient } from '@app/modules/cocktails/cocktails.model';
import { IngredientsApiService } from '@app/modules/cocktails/ingredients-api.service';

export const IngredientsResolver: ResolveFn<Ingredient[]> = () => {
  return inject(IngredientsApiService).getSavedIngredients();
};
