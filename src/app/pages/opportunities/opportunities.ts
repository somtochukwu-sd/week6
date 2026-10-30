import { Component, inject, signal } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../services/theme.service';

// Opportunities page (from preview.html) — WEEK 6 updates:
// - "Hello, [Component Name]" is rendered from a WRITABLE SIGNAL (`name`)
// - `bgColor` (also a writable signal) receives the colour picked in the
//   navbar through the ThemeService stream and is applied with [ngStyle]
@Component({
  selector: 'app-opportunities',
  imports: [NgClass, NgStyle],
  templateUrl: './opportunities.html',
  styleUrl: './opportunities.css',
})
export class Opportunities {
  name = signal('Opportunities');
  bgColor = signal('');
  theme = inject(ThemeService);

  constructor() {
    this.theme.selectedColor$
      .pipe(takeUntilDestroyed())
      .subscribe((hex) => this.bgColor.set(hex));
  }
}
