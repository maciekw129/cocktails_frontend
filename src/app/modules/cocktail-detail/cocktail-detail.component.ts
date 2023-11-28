import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@src/app/core/components/hero/hero.component';
import { ActivatedRoute } from '@angular/router';
import { combineLatestWith, map, Observable, tap } from 'rxjs';
import { IngredientsTableComponent } from '@src/app/modules/create-cocktail/components/ingredients-table/ingredients-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { PreparationStepComponent } from '@src/app/modules/cocktail-detail/components/preparation-step/preparation-step.component';
import { MatCardModule } from '@angular/material/card';
import { CategoryLabelPipe } from '@src/app/core/pipes/category-label.pipe';
import { DifficultyLabelPipe } from '@src/app/core/pipes/difficulty-label.pipe';
import {
  Cocktail,
  CocktailDetailState,
  Ingredient,
} from '@src/app/core/model/cocktails.model';
import { USER_DATA } from '@app/auth/auth.tokens';
import { ButtonComponent } from '@src/app/shared/components/button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { AuthorPipe } from '@app/core/pipes/author.pipe';
import { StatefulService } from 'ngx-stateful-service';

@Component({
  selector: 'c-cocktail-detail',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    IngredientsTableComponent,
    PreparationStepComponent,
    MatCardModule,
    CategoryLabelPipe,
    DifficultyLabelPipe,
    ButtonComponent,
    MatIconModule,
    AuthorPipe,
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
