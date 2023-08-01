import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'c-shell',
  standalone: true,
  template: `
    <div class="main-container">
      <c-navbar/>
      <router-outlet></router-outlet>
    </div>
  `,
  imports: [
    RouterOutlet,
    NavbarComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ShellComponent {

}
