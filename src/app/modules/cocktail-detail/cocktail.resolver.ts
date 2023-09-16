import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { Cocktail } from '@app/modules/create-cocktail/create-cocktail.model';
import { inject } from '@angular/core';
import { CocktailDetailApiService } from '@app/modules/cocktail-detail/cocktail-detail-api.service';

export const CocktailResolver: ResolveFn<Cocktail> = (
  route: ActivatedRouteSnapshot
) => {
  const cocktailDetailApiService = inject(CocktailDetailApiService);
  const cocktailId = route.params['id'] as string;

  return cocktailDetailApiService.getCocktail(cocktailId);
};
