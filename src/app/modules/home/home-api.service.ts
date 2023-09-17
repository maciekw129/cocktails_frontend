import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '@app/env.token';
import { CocktailApi } from '@app/core/cocktails/cocktails.model';

@Injectable({ providedIn: 'root' })
export class HomeApiService {
  private http = inject(HttpClient);
  private API_URL = inject(API_URL);

  public getAllCocktails(): Observable<CocktailApi[]> {
    return this.http.get<CocktailApi[]>(`${this.API_URL}/cocktails`);
  }
}
