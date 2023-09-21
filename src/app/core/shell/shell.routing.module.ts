import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import ShellComponent from '@app/core/shell/shell.component';
import { HomeComponent } from '@app/modules/home/home.component';
import { IngredientsResolver } from '@app/modules/create-cocktail/ingredients.resolver';
import { AuthGuards } from '@app/auth/auth-guards';
import { CocktailResolver } from '@app/modules/cocktail-detail/cocktail.resolver';
import { CocktailsResolver } from '@app/modules/home/cocktails.resolver';
import { UserCocktailsResolver } from '@app/modules/user-profile/user-cocktails.resolver';

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
        resolve: {
          cocktailsApi: CocktailsResolver,
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
        path: 'user-profile',
        canActivate: [AuthGuards.authentication()],
        resolve: {
          cocktails: UserCocktailsResolver,
        },
        loadComponent: () =>
          import('@app/modules/user-profile/user-profile.component').then(
            m => m.UserProfileComponent
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
