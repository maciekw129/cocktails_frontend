import { Injectable } from '@angular/core';
import { StatefulService } from '@app/shared/services/stateful-service';
import { GlobalLoaderState } from '@app/core/global-loader/global-loader.model';

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
