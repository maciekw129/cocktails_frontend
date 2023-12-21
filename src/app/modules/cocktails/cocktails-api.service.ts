import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { HttpWithMessage } from '@app/shared/services/http-with-message';
import { Cocktail, CocktailApi } from '@app/modules/cocktails/cocktails.model';
import { API_URL } from '@app/env.token';
import { Observable } from 'rxjs';
import { Page } from '@app/shared/paginator/paginator.model';

@Injectable({ providedIn: 'root' })
export class CocktailsApiService {
  private http = inject(HttpClient);
  private httpWithMessage = inject(HttpWithMessage);

  private readonly API_URL = inject(API_URL);
  private readonly COCKTAILS_URL = `${this.API_URL}/cocktails`;

  public getCocktail(cocktailId: string): Observable<Cocktail> {
    return this.http.get<CocktailApi>(`${this.COCKTAILS_URL}/${cocktailId}`);
  }

  public getCocktails(params: HttpParams): Observable<Page<CocktailApi>> {
    return this.http.get<Page<CocktailApi>>(`${this.COCKTAILS_URL}`, {
      params,
    });
  }

  public createCocktail(cocktail: Cocktail): Observable<CocktailApi> {
    return this.httpWithMessage.post<CocktailApi>(
      `${this.COCKTAILS_URL}`,
      'You successfully created new cocktail!',
      cocktail
    );
  }
}
