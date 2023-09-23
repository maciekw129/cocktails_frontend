import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { CocktailApi } from '@app/core/model/cocktails.model';
import { CocktailsApiService } from '@app/core/services/cocktails-api.service';

export const CocktailsResolver: ResolveFn<CocktailApi> = (
  route: ActivatedRouteSnapshot
) => {
  const cocktailsApiService = inject(CocktailsApiService);

  return cocktailsApiService.getAllCocktails(route.queryParams);
};
