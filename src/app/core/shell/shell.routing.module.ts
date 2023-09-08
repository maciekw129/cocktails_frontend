import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import ShellComponent from '@app/core/shell/shell.component';
import { HomeComponent } from '@app/modules/home/home.component';
import { IngredientsResolver } from '@app/modules/create-cocktail/ingredients.resolver';
import { AuthGuards } from '@app/auth/auth-guards';

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
          import(
            '../../modules/create-cocktail/create-cocktail.component'
          ).then(m => m.CreateCocktailComponent),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export default class ShellRoutingModule {}
