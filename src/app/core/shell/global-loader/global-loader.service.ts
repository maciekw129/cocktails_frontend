import { Injectable } from '@angular/core';
import { StatefulService } from '@app/shared/services/stateful-service';
import { GlobalLoaderState } from '@app/core/shell/global-loader/global-loader.model';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoaderService extends StatefulService<GlobalLoaderState> {
  constructor() {
    super({
      isLoading: true,
    });
  }

  setIsLoading(isLoading: boolean) {
    this.patchState({ isLoading });
  }
}
