import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@frontend/src/app/env.token';
import { Ingredient } from '@frontend/src/app/core/model/cocktails.model';

@Injectable({ providedIn: 'root' })
export class IngredientsApiService {
  private http = inject(HttpClient);
  private readonly API_URL = inject(API_URL);

  public getSavedIngredients() {
    return this.http.get<Ingredient[]>(`${this.API_URL}/ingredients`);
  }
}
