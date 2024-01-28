import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class FormService {
  _formSubmit$ = new Subject<void>();

  get formSubmit$() {
    return this._formSubmit$.asObservable();
  }

  emitFormSubmit() {
    this._formSubmit$.next();
  }
}
