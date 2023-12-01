import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@app/core/hero/hero.component';
import { ActivatedRoute } from '@angular/router';
import { combineLatestWith, map, Observable, tap } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import {
  Cocktail,
  CocktailDetailState,
  Ingredient,
} from '@app/modules/cocktails/cocktails.model';
import { USER_DATA } from '@app/auth/auth.tokens';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthorPipe } from '@app/shared/pipes/author.pipe';
import { StatefulService } from 'ngx-stateful-service';
import { IngredientsTableComponent } from '@app/modules/cocktails/create-cocktail/components/ingredients-table/ingredients-table.component';
import { PreparationStepComponent } from '@app/modules/cocktails/cocktail-detail/components/preparation-step/preparation-step.component';
import { valueFromPipe } from '@app/shared/pipes/value-from.pipe';
import {
  categoryLables,
  difficultyLabels,
} from '@app/modules/cocktails/cocktails.data';

@Component({
  selector: 'c-cocktail-detail',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    IngredientsTableComponent,
    PreparationStepComponent,
    MatCardModule,
    ButtonComponent,
    MatIconModule,
    AuthorPipe,
    valueFromPipe,
  ],
  templateUrl: './cocktail-detail.component.html',
  styleUrls: ['./cocktail-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailDetailComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private cocktailDetailStatefulService = inject(
    StatefulService<CocktailDetailState>
  );
  private userData$ = inject(USER_DATA);

  protected readonly categoryLables = categoryLables;
  protected readonly difficultyLabels = difficultyLabels;

  cocktail$: Observable<Cocktail> =
    this.cocktailDetailStatefulService.getStateSlice$('cocktail');

  ingredients$: Observable<MatTableDataSource<Ingredient>> =
    this.cocktailDetailStatefulService
      .getStateSlice$('ingredients')
      .pipe(
        map(
          (ingredients: Ingredient[]) =>
            new MatTableDataSource<Ingredient>(ingredients)
        )
      );

  isCocktailAuthor$: Observable<boolean> = this.cocktail$.pipe(
    combineLatestWith(this.userData$),
    map(([cocktail, userData]) => cocktail.author.id === userData?.id)
  );

  ngOnInit() {
    this.resolve$.subscribe();
  }

  private resolve$ = this.activatedRoute.data.pipe(
    tap(({ cocktail }: { cocktail: Cocktail }) =>
      this.cocktailDetailStatefulService.patchState({ cocktail })
    )
  );
}
