import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CategoryLabelPipe } from '@app/modules/cocktail-detail/components/preparation-step/pipes/category-label.pipe';
import { DifficultyLabelPipe } from '@app/modules/cocktail-detail/components/preparation-step/pipes/difficulty-label.pipe';
import { RouterLink } from '@angular/router';
import { CocktailApi } from '@app/core/cocktails/cocktails.model';

@Component({
  selector: 'c-cocktail-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    CategoryLabelPipe,
    DifficultyLabelPipe,
    RouterLink,
  ],
  templateUrl: './cocktail-card.component.html',
  styleUrls: ['./cocktail-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailCardComponent {
  @Input() cocktail: CocktailApi;
}
