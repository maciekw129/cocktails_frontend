import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@app/env.token';
import { Ingredient } from '@app/modules/create-cocktail/create-cocktail.model';

@Injectable({ providedIn: 'root' })
export class CreateCocktailApiService {
  private http = inject(HttpClient);
  private readonly API_URL = inject(API_URL);

  public getSavedIngredients() {
    return this.http.get<Ingredient[]>(`${this.API_URL}/ingredients`);
  }
}
