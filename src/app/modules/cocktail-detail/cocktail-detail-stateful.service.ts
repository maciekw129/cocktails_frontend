import { Injectable } from '@angular/core';
import { StatefulService } from '@app/shared/services/stateful-service';
import { Cocktail } from '@app/modules/create-cocktail/create-cocktail.model';

@Injectable()
export class CocktailDetailStatefulService extends StatefulService<Cocktail> {
  constructor() {
    super(null);
  }

  setCocktail(cocktail: Cocktail) {
    this.patchState(cocktail);
  }
}
