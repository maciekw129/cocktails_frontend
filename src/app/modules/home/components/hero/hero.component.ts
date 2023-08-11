import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'c-hero',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent {}
