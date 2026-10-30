import { Component, inject, signal } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ThemeService, StreamMode } from '../../services/theme.service';

// Navbar: every nav item is wired to its page with routerLink (Requirement 1).
// WEEK 6: the navbar also owns the colour picker and the demo-stream toggle.
// routerLinkActive highlights the page you are currently on.
@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {
  theme = inject(ThemeService);
  selectedColor = signal('blue');
  links = [
    { label: 'About', path: '/about' },
    { label: 'Programmes', path: '/programmes' },
    { label: 'Resources', path: '/resources' },
    { label: 'Events', path: '/events' },
    { label: 'Media', path: '/media' },
    { label: 'Opportunities', path: '/opportunities' },
    { label: 'Community', path: '/community' },
  ];

  // Push the chosen colour through the streams in ThemeService
  onColorChange(event: Event) {
    const name = (event.target as HTMLSelectElement).value;
    this.selectedColor.set(name);
    this.theme.setColor(name);
  }

  // Switch the demo between the plain Subject and the BehaviorSubject
  onModeChange(event: Event) {
    this.theme.setMode((event.target as HTMLSelectElement).value as StreamMode);
  }
}
