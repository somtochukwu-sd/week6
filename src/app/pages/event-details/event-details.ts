import { Component, computed, inject, signal } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { eventList } from '../../data/eventList';
import { ThemeService } from '../../services/theme.service';

// Event details page — reads the ROUTE PARAMETER ":id" from the URL
// (e.g. /events/slr) and shows that specific event from eventList.
@Component({
  selector: 'app-event-details',
  imports: [NgClass, NgStyle, RouterLink],
  templateUrl: './event-details.html',
  styleUrl: './event-details.css',
})
export class EventDetails {
  // WEEK 6: greeting via a writable signal + navbar colour stream
  name = signal('EventDetails');
  bgColor = signal('');
  theme = inject(ThemeService);

  private route = inject(ActivatedRoute);

  private params = toSignal(this.route.paramMap, { initialValue: this.route.snapshot.paramMap });
  eventId = computed(() => this.params().get('id'));
  event = computed(() => eventList.find((e) => e.id === this.eventId()));

  constructor() {
    this.theme.selectedColor$.pipe(takeUntilDestroyed()).subscribe((hex) => this.bgColor.set(hex));
  }
}
