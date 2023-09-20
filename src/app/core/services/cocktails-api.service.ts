import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpWithMessage } from '@app/shared/services/http-with-message';
import { Cocktail, CocktailApi } from '@app/core/model/cocktails.model';
import { API_URL } from '@app/env.token';
import { Observable } from 'rxjs';
import { Filters } from '@app/modules/home/home.model';

@Injectable({ providedIn: 'root' })
export class CocktailsApiService {
  private http = inject(HttpClient);
  private httpWithMessage = inject(HttpWithMessage);
  private readonly API_URL = inject(API_URL);

  public getCocktail(cocktailId: string): Observable<Cocktail> {
    return this.http.get<Cocktail>(`${this.API_URL}/cocktails/${cocktailId}`);
  }

  public getAllCocktails(params?: Partial<Filters>): Observable<CocktailApi> {
    return this.http.get<CocktailApi>(`${this.API_URL}/cocktails`, {
      params,
    });
  }

  public createCocktail(
    cocktail: Omit<Cocktail, 'id'>
  ): Observable<CocktailApi> {
    return this.httpWithMessage.post<CocktailApi>(
      `${this.API_URL}/cocktails`,
      'You successfully created new cocktail!',
      cocktail
    );
  }
}
