import {ChangeDetectionStrategy, Component} from "@angular/core";
import {NgOptimizedImage} from "@angular/common";
import {MatButtonModule} from "@angular/material/button";
import {LinkComponent} from "../../shared/components/link/link.component";
import {RouterLink} from "@angular/router";
import {ButtonComponent} from "../../shared/components/button/button.component";

@Component({
  selector: 'c-navbar',
  standalone: true,
  templateUrl: 'navbar.component.html',
  styleUrls: ['navbar.component.scss'],
  imports: [
    NgOptimizedImage,
    MatButtonModule,
    LinkComponent,
    RouterLink,
    ButtonComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavbarComponent {

}
