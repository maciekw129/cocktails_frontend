import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import ShellComponent from "./shell.component";

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export default class ShellRoutingModule {}
