import { StatefulService } from '@app/shared/services/stateful-service';
import { Injectable } from '@angular/core';
import { CocktailApi } from '@app/core/cocktails/cocktails.model';

export interface HomeState {
  cocktails: CocktailApi[];
}

@Injectable()
export class HomeStatefulService extends StatefulService<HomeState> {
  constructor() {
    super({
      cocktails: [],
    });
  }

  public patchCocktailsState(cocktails: CocktailApi[]) {
    this.patchState({ cocktails });
  }
}
