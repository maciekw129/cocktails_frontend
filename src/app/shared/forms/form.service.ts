import { Injectable } from '@angular/core';
import { Subject, tap } from 'rxjs';

@Injectable()
export class FormService {
  private _formSubmit$ = new Subject<void>();

  constructor() {
    console.log(this);
  }

  get formSubmit$() {
    return this._formSubmit$.asObservable().pipe(tap(console.log));
  }

  emitFormSubmit() {
    this._formSubmit$.next();
  }
}
