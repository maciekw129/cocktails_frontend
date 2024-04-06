import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@app/core/hero/hero.component';
import { ButtonComponent } from '@cocktails-ui';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthStatefulService } from '@app/auth/auth-stateful.service';
import { CocktailCardComponent } from '@app/modules/cocktails/cocktail-card/cocktail-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { PaginatorService } from '@app/shared/paginator/paginator.service';
import { PaginatorComponent } from '@app/shared/paginator/paginator.component';
import { CocktailsApiService } from '@app/modules/cocktails/cocktails-api.service';
import { CocktailsPaginatorFilterComponent } from '@app/modules/cocktails/cocktails-paginator-filter/cocktails-paginator-filter.component';

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
    MatPaginatorModule,
    MatProgressSpinnerModule,
    PaginatorComponent,
    CocktailsPaginatorFilterComponent,
  ],
  templateUrl: './home.component.html',
  providers: [PaginatorService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  public isAuthorized$ = AuthStatefulService.useIsAuthorized$();
  private cocktailsApiService = inject(CocktailsApiService);

  get cocktailsRequest() {
    return this.cocktailsApiService.getCocktails.bind(this.cocktailsApiService);
  }
}
