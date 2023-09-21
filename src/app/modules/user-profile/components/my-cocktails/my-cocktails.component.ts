import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { Cocktail } from '@app/core/model/cocktails.model';

@Component({
  selector: 'c-my-cocktails',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-cocktails.component.html',
  styleUrls: ['./my-cocktails.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MyCocktailsComponent {
  cocktails$: Observable<Cocktail[]> = inject(ActivatedRoute).data.pipe(
    map(({ cocktails }: { cocktails: Cocktail[] }) => cocktails)
  );
}
