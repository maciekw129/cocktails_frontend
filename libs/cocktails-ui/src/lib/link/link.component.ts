import { ChangeDetectionStrategy, Component, input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'c-link',
  standalone: true,
  templateUrl: 'link.component.html',
  styleUrls: ['link.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink],
})
export class LinkComponent implements OnInit {
  public href = input('');
  public routerLink = input<string>(null);

  ngOnInit() {
    if (!this.href()) {
      console.warn("c-link: You haven't provided href attribute.");
    }
  }
}
