import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CORE_ROUTES } from '@app/core/core-routes';

@NgModule({
  imports: [RouterModule.forChild(CORE_ROUTES)],
})
export default class ShellRoutingModule {}
