import { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { CocktailsApi } from '@src/app/core/model/cocktails.model';
import { CocktailsApiService } from '@src/app/core/services/cocktails-api.service';

export const CocktailsResolver: ResolveFn<CocktailsApi> = (
  route: ActivatedRouteSnapshot
) => {
  const cocktailsApiService = inject(CocktailsApiService);
  const page = route.queryParams['page'] ? Number(route.queryParams['page']) : 1;

  return cocktailsApiService.getAllCocktails(page, route.queryParams);
};
