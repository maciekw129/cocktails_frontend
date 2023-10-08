import { StatefulService } from '@src/app/shared/services/stateful-service';
import { Injectable } from '@angular/core';
import {HomeState} from "@src/app/modules/home/home.model";

@Injectable()
export class HomeStatefulService extends StatefulService<HomeState> {
  constructor() {
    super({
      cocktails: [],
      pageMeta: null,
      filters: null,
      page: 1
    });
  }
}
