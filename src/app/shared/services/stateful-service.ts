import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable()
export abstract class StatefulService<T extends Record<string, any>> {
  protected _state$$: BehaviorSubject<T>;

  get state$$() {
    return this._state$$.asObservable();
  }

  constructor(initialState: T) {
    this._state$$ = new BehaviorSubject<T>(initialState);
  }

  protected patchState(stateSlice: Partial<T>) {
    this._state$$.next({
      ...this._state$$.value,
      ...stateSlice,
    });
  }

  public getStateSlice(key: keyof T): Observable<Partial<T>> {
    return this.state$$.pipe(map(state => state[key]));
  }
}
