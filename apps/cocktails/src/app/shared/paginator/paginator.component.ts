import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { CocktailCardComponent } from '@app/modules/cocktails/cocktail-card/cocktail-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { PaginatorService } from '@app/shared/paginator/paginator.service';
import { Page } from '@app/shared/paginator/paginator.model';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  standalone: true,
  selector: 'c-paginator',
  templateUrl: 'paginator.component.html',
  styleUrls: ['paginator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    CocktailCardComponent,
    MatProgressSpinnerModule,
    MatPaginatorModule,
  ],
})
export class PaginatorComponent<T, F> implements OnInit {
  @Input() request: (params: HttpParams) => Observable<Page<T>>;
  @Input() itemTemplate: TemplateRef<any>;
  @Input() emptyText = 'The list is empty.';

  private paginatorService = inject(PaginatorService<T, F>);

  public pageState$ = this.paginatorService.getStateSlice$('pageState');
  public data$ = this.paginatorService.getStateSlice$('data');
  public isLoading$ = this.paginatorService.getStateSlice$('isLoading');

  ngOnInit() {
    this.paginatorService.initializePaginator(this.request);
  }

  public handlePageChange({ pageIndex, pageSize, length }: PageEvent) {
    this.paginatorService.patchState({
      pageState: {
        ...this.paginatorService.getStateSliceValue('pageState'),
        page: pageIndex + 1,
        pageCount: length,
        take: pageSize,
      },
    });
  }
}
