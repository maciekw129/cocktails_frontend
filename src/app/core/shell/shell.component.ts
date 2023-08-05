import {ChangeDetectionStrategy, Component} from "@angular/core";
import {RouterOutlet} from "@angular/router";
import {NavbarComponent} from "../navbar/navbar.component";
import {HeroComponent} from "../hero/hero.component";

@Component({
  selector: 'c-shell',
  standalone: true,
  template: `
    <div>
      <c-navbar class="main-container"/>
      <main>
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  imports: [
    RouterOutlet,
    NavbarComponent,
    HeroComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class ShellComponent {

}
