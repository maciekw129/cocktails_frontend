import {
  ChangeDetectionStrategy,
  Component,
  HostListener,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@app/core/hero/hero.component';
import { CreateCocktailFormComponent } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-form.component';
import { Cocktail } from '@app/modules/create-cocktail/create-cocktail.model';
import { CreateCocktailApiService } from '@app/modules/create-cocktail/create-cocktail-api.service';

@Component({
  selector: 'c-create-cocktail',
  standalone: true,
  imports: [CommonModule, HeroComponent, CreateCocktailFormComponent],
  templateUrl: './create-cocktail.component.html',
  styleUrls: ['create-cocktail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCocktailComponent {
  private createCocktailApiService = inject(CreateCocktailApiService);

  @HostListener('window:beforeunload')
  unloadHandler() {
    window.opener.location.reload();
  }

  public createCocktail(cocktail: Cocktail) {
    this.createCocktailApiService.createCocktail(cocktail).subscribe();
  }
}
