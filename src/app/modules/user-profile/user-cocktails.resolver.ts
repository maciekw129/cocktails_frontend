import { ResolveFn } from '@angular/router';
import { inject } from '@angular/core';
import { Cocktail } from '@app/modules/cocktails/cocktails.model';
import { CocktailsApiService } from '@app/modules/cocktails/cocktails-api.service';
import { USER_DATA_VALUE } from '@app/auth/auth.tokens';

export const UserCocktailsResolver: ResolveFn<Cocktail> = () => {
  const userData = inject(USER_DATA_VALUE);

  return inject(CocktailsApiService).getAllCocktails({ userId: userData.id });
};
