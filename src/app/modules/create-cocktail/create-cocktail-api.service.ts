import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@app/env.token';
import {
  Cocktail,
  Ingredient,
} from '@app/modules/create-cocktail/create-cocktail.model';
import { HttpWithMessage } from '@app/shared/services/http-with-message';

@Injectable({ providedIn: 'root' })
export class CreateCocktailApiService {
  private http = inject(HttpClient);
  private httpWithMessage = inject(HttpWithMessage);
  private readonly API_URL = inject(API_URL);

  public getSavedIngredients() {
    return this.http.get<Ingredient[]>(`${this.API_URL}/ingredients`);
  }

  public createCocktail(cocktail: Cocktail) {
    return this.httpWithMessage.post<Cocktail>(
      `${this.API_URL}/cocktails`,
      'You successfully added cocktail!',
      cocktail
    );
  }
}
