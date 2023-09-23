import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { HeroComponent } from '@app/core/components/hero/hero.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthStatefulService } from '@app/auth/auth-stateful.service';
import { tap } from 'rxjs';
import { HomeStatefulService } from '@app/modules/home/home-stateful.service';
import { CocktailCardComponent } from '@app/modules/home/components/cocktail-card/cocktail-card.component';
import { CocktailApi } from '@app/core/model/cocktails.model';
import { FiltersFormComponent } from '@app/modules/home/forms/filters-form/filters-form.component';
import { Filters } from '@app/modules/home/home.model';
import { CocktailsApiService } from '@app/core/services/cocktails-api.service';
import { MatPaginatorModule } from '@angular/material/paginator';

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
  providers: [HomeStatefulService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);
  private location = inject(Location);
  private homeStatefulService = inject(HomeStatefulService);
  private cocktailsApiService = inject(CocktailsApiService);

  public isAuthorized$ = AuthStatefulService.useIsAuthorized$();

  cocktails$ = this.homeStatefulService.getStateSlice('cocktails');
  pageMeta$ = this.homeStatefulService.getStateSlice('pageMeta');

  resolve$ = this.activatedRoute.data.pipe(
    tap(({ cocktailsApi }: { cocktailsApi: CocktailApi }) => {
      const { data, meta } = cocktailsApi;

      this.homeStatefulService.patchState({ cocktails: data });
      this.homeStatefulService.patchState({ pageMeta: meta });
    })
  );

  ngOnInit() {
    this.resolve$.subscribe();
  }

  handleFilter(filters: Partial<Filters>) {
    this.cocktailsApiService
      .getAllCocktails(filters)
      .pipe(
        tap(({ data, meta }) => {
          const urlTree = this.router.createUrlTree([''], {
            relativeTo: this.activatedRoute,
            queryParams: filters,
          });

          this.location.replaceState(urlTree.toString());

          this.homeStatefulService.patchState({ cocktails: data });
          this.homeStatefulService.patchState({ pageMeta: meta });
        })
      )
      .subscribe();
  }
}
