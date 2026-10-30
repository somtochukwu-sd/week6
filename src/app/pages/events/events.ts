import { Component, computed, inject, signal } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { eventList } from '../../data/eventList';
import { ThemeService } from '../../services/theme.service';

// Events page (Requirement 2)
// - loads the eventList object and renders it with @for
// - "Register now" goes to /events/:id (route parameter)
// - the buttons use QUERY PARAMETERS:
//     single   -> /events?tag=Training
//     multiple -> /events?tag=Seminar&event=slr   (filters AND highlights one event)
@Component({
  selector: 'app-events',
  imports: [NgClass, NgStyle, RouterLink],
  templateUrl: './events.html',
  styleUrl: './events.css',
})
export class Events {
  // WEEK 6: greeting via a writable signal + navbar colour stream
  name = signal('Events');
  bgColor = signal('');
  theme = inject(ThemeService);

  private route = inject(ActivatedRoute);
  private router = inject(Router);

  events = eventList;
  tags = ['Training', 'Seminar', 'Workshop'];

  // Query params as a signal so the page updates whenever the URL changes
  private query = toSignal(this.route.queryParamMap, { initialValue: this.route.snapshot.queryParamMap });
  selectedTag = computed(() => this.query().get('tag'));
  selectedEvent = computed(() => this.query().get('event'));

  filteredEvents = computed(() => {
    const tag = this.selectedTag();
    return tag ? this.events.filter((e) => e.tag === tag) : this.events;
  });

  // Single query parameter
  filterByTag(tag: string | null) {
    this.router.navigate(['/events'], { queryParams: tag ? { tag } : {} });
  }

  // Multiple query parameters
  quickView(tag: string, event: string) {
    this.router.navigate(['/events'], { queryParams: { tag, event } });
  }

  constructor() {
    this.theme.selectedColor$.pipe(takeUntilDestroyed()).subscribe((hex) => this.bgColor.set(hex));
  }
}
