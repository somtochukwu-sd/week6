import { Component, inject, signal } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { ThemeService } from '../../services/theme.service';

// Programmes page (from preview.html) — WEEK 6 updates:
// - "Hello, [Component Name]" is rendered from a WRITABLE SIGNAL (`name`)
// - `bgColor` (also a writable signal) receives the colour picked in the
//   navbar through the ThemeService stream and is applied with [ngStyle]
@Component({
  selector: 'app-programmes',
  imports: [NgClass, NgStyle, RouterLink],
  templateUrl: './programmes.html',
  styleUrl: './programmes.css',
})
export class Programmes {
  name = signal('Programmes');
  bgColor = signal('');
  theme = inject(ThemeService);

  constructor() {
    this.theme.selectedColor$
      .pipe(takeUntilDestroyed())
      .subscribe((hex) => this.bgColor.set(hex));
  }
}
