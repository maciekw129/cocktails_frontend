import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { CocktailsApi } from '@app/modules/cocktails/cocktails.model';
import { CocktailsApiService } from '@app/modules/cocktails/cocktails-api.service';

export const CocktailsResolver: ResolveFn<CocktailsApi> = (
  route: ActivatedRouteSnapshot
) => {
  const cocktailsApiService = inject(CocktailsApiService);
  const page = route.queryParams['page']
    ? Number(route.queryParams['page'])
    : 1;

  return cocktailsApiService.getAllCocktails(page, route.queryParams);
};
