import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Ingredient } from '@app/core/model/cocktails.model';
import { IngredientsApiService } from '@app/core/services/ingredients-api.service';

export const IngredientsResolver: ResolveFn<Ingredient[]> = () => {
  return inject(IngredientsApiService).getSavedIngredients();
};
