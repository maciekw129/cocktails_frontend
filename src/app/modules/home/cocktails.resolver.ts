import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { HomeApiService } from '@app/modules/home/home-api.service';
import { CocktailApi } from '@app/core/cocktails/cocktails.model';

export const CocktailsResolver: ResolveFn<CocktailApi[]> = () => {
  const homeApiService = inject(HomeApiService);

  return homeApiService.getAllCocktails();
};
