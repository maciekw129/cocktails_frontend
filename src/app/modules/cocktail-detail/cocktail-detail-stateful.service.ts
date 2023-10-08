import { Injectable } from '@angular/core';
import { StatefulService } from '@src/app/shared/services/stateful-service';
import { Cocktail } from '@src/app/core/model/cocktails.model';

@Injectable()
export class CocktailDetailStatefulService extends StatefulService<Cocktail> {
  constructor() {
    super(null);
  }

  setCocktail(cocktail: Cocktail) {
    this.patchState(cocktail);
  }
}
