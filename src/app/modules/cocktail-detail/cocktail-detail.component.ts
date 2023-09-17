import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@app/core/components/hero/hero.component';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, tap } from 'rxjs';
import { CocktailDetailStatefulService } from '@app/modules/cocktail-detail/cocktail-detail-stateful.service';
import { IngredientsTableComponent } from '@app/modules/create-cocktail/components/ingredients-table/ingredients-table.component';
import { MatTableDataSource } from '@angular/material/table';
import { PreparationStepComponent } from '@app/modules/cocktail-detail/components/preparation-step/preparation-step.component';
import { MatCardModule } from '@angular/material/card';
import { CategoryLabelPipe } from '@app/modules/cocktail-detail/components/preparation-step/pipes/category-label.pipe';
import { DifficultyLabelPipe } from '@app/modules/cocktail-detail/components/preparation-step/pipes/difficulty-label.pipe';
import { Cocktail, Ingredient } from '@app/core/model/cocktails.model';

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
  ],
  templateUrl: './cocktail-detail.component.html',
  styleUrls: ['./cocktail-detail.component.scss'],
  providers: [CocktailDetailStatefulService],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailDetailComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private cocktailDetailStatefulService = inject(CocktailDetailStatefulService);

  cocktail$: Observable<Cocktail> =
    this.cocktailDetailStatefulService.getWholeState();

  ingredients$: Observable<MatTableDataSource<Ingredient>> =
    this.cocktailDetailStatefulService
      .getStateSlice('ingredients')
      .pipe(
        map(
          (ingredients: Ingredient[]) =>
            new MatTableDataSource<Ingredient>(ingredients)
        )
      );

  ngOnInit() {
    this.resolve$.subscribe();
  }

  private resolve$ = this.activatedRoute.data.pipe(
    tap(({ cocktail }: { cocktail: Cocktail }) => {
      this.cocktailDetailStatefulService.setCocktail(cocktail);
    })
  );
}
