import {NgModule} from "@angular/core";
import {Route, RouterModule} from "@angular/router";
import ShellComponent from "./shell.component";
import {HomeComponent} from "../../modules/home/home.component";

const routes: Route[] = [
  {
    path: '',
    component: ShellComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export default class ShellRoutingModule {}
