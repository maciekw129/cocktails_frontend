import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import {CommonModule, Location} from '@angular/common';
import {HeroComponent} from '@src/app/core/components/hero/hero.component';
import {ButtonComponent} from '@src/app/shared/components/button/button.component';
import {MatIconModule} from '@angular/material/icon';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {AuthStatefulService} from '@src/app/auth/auth-stateful.service';
import {combineLatest, switchMap, take, tap} from 'rxjs';
import {HomeStatefulService} from '@src/app/modules/home/home-stateful.service';
import {CocktailCardComponent} from '@src/app/modules/home/components/cocktail-card/cocktail-card.component';
import {CocktailsApi} from '@src/app/core/model/cocktails.model';
import {FiltersFormComponent} from '@src/app/modules/home/forms/filters-form/filters-form.component';
import {Filters} from '@src/app/modules/home/home.model';
import {CocktailsApiService} from '@src/app/core/services/cocktails-api.service';
import {MatPaginatorIntl, MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {PaginatorService} from "@src/app/modules/home/paginator.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    ButtonComponent,
    MatIconModule,
    RouterLink,
    CocktailCardComponent,
    FiltersFormComponent,
    MatPaginatorModule,
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeStatefulService, {provide: MatPaginatorIntl, useClass: PaginatorService}],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private homeStatefulService = inject(HomeStatefulService);
  private cocktailsApiService = inject(CocktailsApiService);

  public isAuthorized$ = AuthStatefulService.useIsAuthorized$();

  public cocktails$ = this.homeStatefulService.getStateSlice('cocktails');
  public pageMeta$ = this.homeStatefulService.getStateSlice('pageMeta');
  private filters$ = this.homeStatefulService.getStateSlice('filters');
  private page$ = this.homeStatefulService.getStateSlice('page');

  private resolve$ = this.activatedRoute.data.pipe(
    tap(({cocktailsApi}: { cocktailsApi: CocktailsApi }) => {
      const {data, meta} = cocktailsApi;

      this.homeStatefulService.patchState({
        cocktails: data,
        pageMeta: meta
      });
    })
  );

  ngOnInit() {
    this.resolve$.subscribe();
  }

  private getCocktails(): void {
    combineLatest([
      this.page$,
      this.filters$
    ]).pipe(
      take(1),
      switchMap(([page, filters]) => {
        this.updateUrl(page, filters);
        return this.cocktailsApiService.getAllCocktails(page, filters);
      }),
      tap(({data, meta}) => {
        this.homeStatefulService.patchState({
          cocktails: data,
          pageMeta: meta
        })
      })
    ).subscribe()
  }

  private updateUrl(page: number, filters: Partial<Filters>): void {
    const urlTree = this.router.createUrlTree([''], {
      relativeTo: this.activatedRoute,
      queryParams: {...filters, page},
    });

    this.location.replaceState(urlTree.toString());
  }

  public handleFilter(filters: Partial<Filters>): void {
    this.homeStatefulService.patchState({filters});

    this.getCocktails();
  }

  public handlePageChange({pageIndex}: PageEvent): void {
    this.homeStatefulService.patchState({page: pageIndex + 1});

    this.getCocktails();
  }
}
