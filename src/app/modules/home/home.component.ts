import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@app/core/components/hero/hero.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthStatefulService } from '@app/auth/auth-stateful.service';
import { Observable, tap } from 'rxjs';
import { HomeStatefulService } from '@app/modules/home/home-stateful.service';
import { CocktailCardComponent } from '@app/modules/home/components/cocktail-card/cocktail-card.component';
import { CocktailApi } from '@app/core/model/cocktails.model';
import { FiltersFormComponent } from '@app/modules/home/forms/filters-form/filters-form.component';
import { Filters } from '@app/modules/home/home.model';

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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeStatefulService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private activatedRoute = inject(ActivatedRoute);
  private homeStatefulService = inject(HomeStatefulService);

  public isAuthorized$ = AuthStatefulService.useIsAuthorized$();

  cocktails$: Observable<CocktailApi[]> =
    this.homeStatefulService.getStateSlice('cocktails');

  resolve$ = this.activatedRoute.data.pipe(
    tap(({ cocktails }: { cocktails: CocktailApi[] }) => {
      this.homeStatefulService.patchCocktailsState(cocktails);
    })
  );

  ngOnInit() {
    this.resolve$.subscribe();
  }

  handleFilter(filters: Filters) {
    console.log(filters);
  }
}
