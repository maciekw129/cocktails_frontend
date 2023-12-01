import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Cocktail } from '@app/modules/cocktails/cocktails.model';
import { CocktailsApiService } from '@app/modules/cocktails/cocktails-api.service';

export const CocktailResolver: ResolveFn<Cocktail> = (
  route: ActivatedRouteSnapshot
) => {
  const cocktailsApiService = inject(CocktailsApiService);
  const cocktailId = route.params['id'] as string;

  return cocktailsApiService.getCocktail(cocktailId);
};
