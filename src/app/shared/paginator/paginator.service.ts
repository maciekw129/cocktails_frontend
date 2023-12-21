import { inject, Injectable } from '@angular/core';
import { CustomStatefulService } from 'ngx-stateful-service';
import {
  Page,
  PaginatorState,
  RequestParams,
} from '@app/shared/paginator/paginator.model';
import {
  combineLatest,
  distinctUntilChanged,
  filter,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs';
import { Helpers } from '@app/shared/utils/helpers';
import { HttpParams } from '@angular/common/http';
import { PaginatorUtils } from '@app/shared/paginator/paginator.utils';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Injectable()
export class PaginatorService<T, F> extends CustomStatefulService<PaginatorState<T, F>> {
  private location = inject(Location);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  constructor() {
    super({
      isLoading: false,
      pageState: {
        page: 1,
        take: 10,
        pageCount: null,
        itemCount: null,
      },
      filters: null,
      data: null,
    });
  }

  private request: (params: HttpParams) => Observable<Page<T>>;

  private listenPaginatorChange$ = combineLatest([
    this.getStateSlice$('pageState').pipe(
      distinctUntilChanged(
        (previous, current) =>
          previous.page === current.page && previous.take === current.take
      )
    ),
    this.getStateSlice$('filters'),
  ]).pipe(
    filter(([pageState]) => Boolean(this.request) && Boolean(pageState)),
    distinctUntilChanged((previous, current) =>
      Helpers.isObjectsEqual(previous, current)
    ),
    tap(() => this.patchState({ isLoading: true })),
    map(([{ page, take }, filters]): RequestParams<F> => ({ page, take, filters })),
    tap(({ page, filters }) => this.updateUrl(page, filters)),
    switchMap(params => this.request(PaginatorUtils.generateHttpParams(params))),
    tap(({ data, meta }) =>
      this.patchState({ isLoading: false, data: data, pageState: meta })
    )
  );

  private updateUrl(page: number, filters: Partial<F>): void {
    const urlTree = this.router.createUrlTree([''], {
      relativeTo: this.activatedRoute,
      queryParams: { ...filters, page },
    });

    this.location.replaceState(urlTree.toString());
  }

  public initializePaginator(request: (params: HttpParams) => Observable<Page<T>>) {
    this.request = request;
    this.listenPaginatorChange$.subscribe();
  }
}
