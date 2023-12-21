import { Injectable } from '@angular/core';
import { GlobalLoaderState } from '@app/core/global-loader/global-loader.model';
import { CustomStatefulService } from 'ngx-stateful-service';

@Injectable({
  providedIn: 'root',
})
export class GlobalLoaderService extends CustomStatefulService<GlobalLoaderState> {
  constructor() {
    super({
      isLoading: true,
    });
  }

  setIsLoading(isLoading: boolean) {
    this.patchState({ isLoading });
  }
}
