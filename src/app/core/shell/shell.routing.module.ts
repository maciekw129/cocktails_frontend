import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import ShellComponent from '@app/core/shell/shell.component';
import { HomeComponent } from '@app/modules/home/home.component';
import { IngredientsResolver } from '@app/modules/create-cocktail/ingredients.resolver';
import { AuthGuards } from '@app/auth/auth-guards';
import { CocktailResolver } from '@app/modules/cocktail-detail/cocktail.resolver';
import { CocktailsResolver } from '@app/modules/home/cocktails.resolver';

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        resolve: {
          cocktails: CocktailsResolver,
          ingredients: IngredientsResolver,
        },
      },
      {
        path: 'create-cocktail',
        canActivate: [AuthGuards.authentication()],
        resolve: {
          ingredients: IngredientsResolver,
        },
        loadComponent: () =>
          import('@app/modules/create-cocktail/create-cocktail.component').then(
            m => m.CreateCocktailComponent
          ),
      },
      {
        path: 'cocktail/:id',
        resolve: {
          cocktail: CocktailResolver,
        },
        loadComponent: () =>
          import('@app/modules/cocktail-detail/cocktail-detail.component').then(
            m => m.CocktailDetailComponent
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('@app/core/components/empty-page/empty-page.component').then(
            m => m.EmptyPageComponent
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export default class ShellRoutingModule {}
