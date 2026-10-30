import { Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable, Subject, map, switchMap } from 'rxjs';

export type StreamMode = 'subject' | 'behaviorSubject';

/**
 * WEEK 6 — ThemeService
 *
 * This service demonstrates the SAME colour-changing functionality twice,
 * once with a plain Subject and once with a BehaviorSubject, so the
 * difference between the two can be seen in the browser:
 *
 * 1. Subject (`colorSubject$`):
 *    - Only broadcasts to subscribers that are listening AT THE MOMENT
 *      `next()` is called.
 *    - It has NO memory. A page that loads (or reloads) AFTER a colour was
 *      chosen receives nothing, so its background stays uncoloured.
 *
 * 2. BehaviorSubject (`colorBehaviorSubject$`):
 *    - Always keeps the LATEST value and immediately replays it to every
 *      new subscriber (and starts with an initial value, here 'blue').
 *    - A page that loads after the colour was chosen gets the colour
 *      straight away.
 *
 * The navbar has a select for the colour (blue, yellow, red, black) and a
 * second select that switches the demo between the two streams, so both
 * behaviours can be compared live.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  // The four colours required by the assignment, with the hex value each maps to
  colors = [
    { name: 'blue', hex: '#2563eb' },
    { name: 'yellow', hex: '#eab308' },
    { name: 'red', hex: '#dc2626' },
    { name: 'black', hex: '#111827' },
  ];

  // --- Option 1: plain Subject (no memory, no initial value) ---
  colorSubject$ = new Subject<string>();

  // --- Option 2: BehaviorSubject (remembers + replays the last colour) ---
  colorBehaviorSubject$ = new BehaviorSubject<string>('blue');

  // Which stream the pages are wired to. Controlled from the navbar select.
  private modeSource$ = new BehaviorSubject<StreamMode>('subject');
  mode = signal<StreamMode>('subject');

  /**
   * The one observable every page component subscribes to.
   * switchMap (an rxjs OPERATOR) redirects the subscription to whichever
   * stream the demo toggle currently points at, so pages keep listening
   * without ever having to unsubscribe manually.
   */
  selectedColor$: Observable<string> = this.modeSource$.pipe(
    switchMap((mode) => (mode === 'subject' ? this.colorSubject$ : this.colorBehaviorSubject$)),
    map((name) => this.hexFor(name)),
  );

  // Pick a colour in the navbar — it is pushed through BOTH streams
  setColor(name: string) {
    this.colorSubject$.next(name);
    this.colorBehaviorSubject$.next(name);
  }

  // Switch the demo between Subject and BehaviorSubject
  setMode(mode: StreamMode) {
    this.modeSource$.next(mode);
    this.mode.set(mode);
  }

  hexFor(name: string): string {
    return this.colors.find((c) => c.name === name)?.hex ?? '';
  }
}
