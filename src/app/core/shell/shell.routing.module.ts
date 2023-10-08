import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import ShellComponent from '@src/app/core/shell/shell.component';
import { HomeComponent } from '@src/app/modules/home/home.component';
import { IngredientsResolver } from '@src/app/modules/create-cocktail/ingredients.resolver';
import { AuthGuards } from '@src/app/auth/auth-guards';
import { CocktailResolver } from '@src/app/modules/cocktail-detail/cocktail.resolver';

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'create-cocktail',
        canActivate: [AuthGuards.authentication()],
        resolve: {
          ingredients: IngredientsResolver,
        },
        loadComponent: () =>
          import('@src/app/modules/create-cocktail/create-cocktail.component').then(
            m => m.CreateCocktailComponent
          ),
      },
      {
        path: 'cocktail/:id',
        resolve: {
          cocktail: CocktailResolver,
        },
        loadComponent: () =>
          import('@src/app/modules/cocktail-detail/cocktail-detail.component').then(
            m => m.CocktailDetailComponent
          ),
      },
      {
        path: 'user-profile',
        canActivate: [AuthGuards.authentication()],
        loadComponent: () =>
          import('@src/app/modules/user-profile/user-profile.component').then(
            m => m.UserProfileComponent
          ),
      },
      {
        path: '**',
        loadComponent: () =>
          import('@src/app/core/components/empty-page/empty-page.component').then(
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
