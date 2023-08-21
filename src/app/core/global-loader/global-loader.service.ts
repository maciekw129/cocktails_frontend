import { inject, Injectable } from '@angular/core';
import { StatefulService } from '../../shared/services/stateful-service';
import { GlobalLoaderState } from './global-loader.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoaderService extends StatefulService<GlobalLoaderState> {
  constructor() {
    super({
      isLoading: false,
    });
  }

  setIsLoading(isLoading: boolean) {
    this.patchState({ isLoading });
  }
}
