import { StatefulService } from '@app/shared/services/stateful-service';
import { Injectable } from '@angular/core';
import { Cocktail, PageMeta } from '@app/core/model/cocktails.model';

export interface HomeState {
  cocktails: Cocktail[];
  pageMeta: PageMeta;
}

@Injectable()
export class HomeStatefulService extends StatefulService<HomeState> {
  constructor() {
    super({
      cocktails: [],
      pageMeta: null,
    });
  }
}
