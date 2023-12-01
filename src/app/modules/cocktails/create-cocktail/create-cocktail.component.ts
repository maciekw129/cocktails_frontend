import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@app/core/hero/hero.component';
import { Cocktail } from '@app/modules/cocktails/cocktails.model';
import { CocktailsApiService } from '@app/modules/cocktails/cocktails-api.service';
import { tap } from 'rxjs';
import { Router } from '@angular/router';
import { CreateCocktailFormComponent } from '@app/modules/cocktails/create-cocktail/forms/create-cocktail-form/create-cocktail-form.component';

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
