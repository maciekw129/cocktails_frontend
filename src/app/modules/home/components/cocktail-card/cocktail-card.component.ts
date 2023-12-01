import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { CocktailListItem } from '@app/modules/cocktails/cocktails.model';
import { AuthorPipe } from '@app/shared/pipes/author.pipe';
import { valueFromPipe } from '@app/shared/pipes/value-from.pipe';
import {
  categoryLables,
  difficultyLabels,
} from '@app/modules/cocktails/cocktails.data';

@Component({
  selector: 'c-cocktail-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, RouterLink, AuthorPipe, valueFromPipe],
  templateUrl: './cocktail-card.component.html',
  styleUrls: ['./cocktail-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CocktailCardComponent {
  @Input() cocktail: CocktailListItem;
  protected readonly categoryLables = categoryLables;
  protected readonly difficultyLabels = difficultyLabels;
}
