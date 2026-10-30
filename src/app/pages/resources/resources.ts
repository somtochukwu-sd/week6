import { Component, computed, inject, signal } from '@angular/core';
import { NgClass, NgStyle } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ThemeService } from '../../services/theme.service';

// Resources page — preview.html built these cards with plain JavaScript;
// here the same data is rendered with @for and filtered with signals.
@Component({
  selector: 'app-resources',
  imports: [NgClass, NgStyle],
  templateUrl: './resources.html',
  styleUrl: './resources.css',
})
export class Resources {
  // WEEK 6: greeting via a writable signal + navbar colour stream
  name = signal('Resources');
  bgColor = signal('');
  theme = inject(ThemeService);

  resources = [
    { title: 'Research Proposal Template', type: 'free', cat: 'methodology', format: 'DOCX · 8 pages', desc: 'Structured proposal template for planning a research study.', price: '' },
    { title: 'Systematic Literature Review Guide', type: 'premium', cat: 'methodology', format: 'PDF · 45 pages', desc: 'Practical guide covering review questions, searching, screening and synthesis.', price: '₦2,500' },
    { title: 'Academic Writing Checklist', type: 'free', cat: 'writing', format: 'PDF · 6 pages', desc: 'A concise checklist for strengthening academic manuscripts.', price: '' },
    { title: 'SPSS Analysis Guide', type: 'premium', cat: 'methodology', format: 'PDF · 32 pages', desc: 'Practical guide to common statistical procedures and interpretation.', price: '₦3,000' },
    { title: 'Literature Review Template', type: 'free', cat: 'writing', format: 'DOCX · 6 pages', desc: 'Planning and synthesis template for literature reviews.', price: '' },
    { title: 'Manuscript Submission Guide', type: 'premium', cat: 'writing', format: 'PDF · 29 pages', desc: 'A practical workflow for preparing and submitting manuscripts.', price: '₦2,000' },
  ];
  filters = ['all', 'free', 'premium', 'methodology', 'writing'];
  filter = signal('all');
  search = signal('');

  visible = computed(() => {
    const q = this.search().toLowerCase();
    const f = this.filter();
    return this.resources.filter(
      (r) => (f === 'all' || r.type === f || r.cat === f) &&
        (!q || r.title.toLowerCase().includes(q) || r.desc.toLowerCase().includes(q)),
    );
  });

  onSearch(e: Event) { this.search.set((e.target as HTMLInputElement).value); }

  constructor() {
    this.theme.selectedColor$.pipe(takeUntilDestroyed()).subscribe((hex) => this.bgColor.set(hex));
  }
}
