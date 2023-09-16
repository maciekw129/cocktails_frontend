import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '@app/env.token';
import { Observable } from 'rxjs';
import { Cocktail } from '@app/modules/create-cocktail/create-cocktail.model';

@Injectable({ providedIn: 'root' })
export class CocktailDetailApiService {
  private http = inject(HttpClient);
  private readonly API_URL = inject(API_URL);

  getCocktail(cocktailId: string): Observable<Cocktail> {
    return this.http.get<Cocktail>(`${this.API_URL}/cocktails/${cocktailId}`);
  }
}
