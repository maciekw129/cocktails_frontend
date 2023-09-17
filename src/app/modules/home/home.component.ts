import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@app/core/hero/hero.component';
import { ButtonComponent } from '@app/shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '@app/auth/auth.service';
import { Observable, tap } from 'rxjs';
import { HomeStatefulService } from '@app/modules/home/home-stateful.service';
import { CocktailCardComponent } from '@app/modules/home/components/cocktail-card/cocktail-card.component';
import { CocktailApi } from '@app/core/cocktails/cocktails.model';

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
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeStatefulService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent {
  private activatedRoute = inject(ActivatedRoute);
  private homeStatefulService = inject(HomeStatefulService);
  public isAuthorized = AuthService.useIsAuthorized$();

  cocktails$: Observable<CocktailApi[]> =
    this.homeStatefulService.getStateSlice('cocktails');

  resolve$ = this.activatedRoute.data.pipe(
    tap(({ cocktails }: { cocktails: CocktailApi[] }) => {
      console.log(cocktails);
      this.homeStatefulService.patchCocktailsState(cocktails);
    })
  );

  ngOnInit() {
    this.resolve$.subscribe();
  }
}
