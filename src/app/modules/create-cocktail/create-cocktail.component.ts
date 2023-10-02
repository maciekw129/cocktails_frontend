import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@app/core/components/hero/hero.component';
import { CreateCocktailFormComponent } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-form.component';
import { Cocktail } from '@app/core/model/cocktails.model';
import { CocktailsApiService } from '@app/core/services/cocktails-api.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'c-create-cocktail',
  standalone: true,
  imports: [CommonModule, HeroComponent, CreateCocktailFormComponent],
  templateUrl: './create-cocktail.component.html',
  styleUrls: ['create-cocktail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCocktailComponent {
  private cocktailsApiService = inject(CocktailsApiService);
  private router = inject(Router);

  @HostListener('window:beforeunload')
  unloadHandler() {
    window.opener.location.reload();
  }

  public createCocktail(cocktail: Omit<Cocktail, 'id' | 'author'>) {
    this.cocktailsApiService
      .createCocktail(cocktail)
      .pipe(tap(({ id }) => this.router.navigate(['cocktail', id])))
      .subscribe();
  }
}
