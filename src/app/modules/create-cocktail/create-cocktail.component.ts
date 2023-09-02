import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '@app/core/hero/hero.component';
import { CreateCocktailFormComponent } from '@app/modules/create-cocktail/forms/create-cocktail-form/create-cocktail-form.component';

@Component({
  selector: 'c-create-cocktail',
  standalone: true,
  imports: [CommonModule, HeroComponent, CreateCocktailFormComponent],
  templateUrl: './create-cocktail.component.html',
  styleUrls: ['create-cocktail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateCocktailComponent {}
