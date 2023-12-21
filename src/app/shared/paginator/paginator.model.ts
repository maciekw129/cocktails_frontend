export interface PaginatorState<T, F> {
  isLoading: boolean;
  pageState: PageState;
  filters: F;
  data: T[];
}

export interface Page<T> {
  data: T[];
  meta: PageState;
}

export interface PageState {
  page: number;
  take: number;
  pageCount: number;
  itemCount: number;
}

export interface BaseParams {
  page: number;
  take: number;
}

export interface RequestParams<F> extends BaseParams {
  filters: F;
}
