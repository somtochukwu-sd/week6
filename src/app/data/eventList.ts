// Requirement 2: eventList.ts exports the list of events shown on the Events page.
// The "id" (bootcamp, slr, spss) is what we pass as the route parameter.
export interface YraEvent {
  id: string;
  heading: string;
  title: string;
  fullTitle: string;
  tag: 'Training' | 'Seminar' | 'Workshop';
  shortDate: string;
  date: string;
  mode: string;
  duration: string;
  fee: string;
  summary: string;
  description: string;
  imageBg?: string;
}

export const eventList: YraEvent[] = [
  {
    id: 'bootcamp', heading: 'BOOTCAMP',
    title: 'YRA Global Research Bootcamp 2026',
    fullTitle: 'YRA Global Research Bootcamp 2026 (Cohort 1)',
    tag: 'Training', shortDate: '20 Aug', date: '20 August 2026', mode: 'Online', duration: '4 Weeks', fee: '₦15,000',
    summary: 'Registration fee: ₦15,000',
    description: 'Intensive research training designed to equip researchers with essential knowledge and practical skills from idea development to publication.',
  },
  {
    id: 'slr', heading: 'SLR',
    title: 'How to Write a Systematic Literature Review',
    fullTitle: 'How to Write a Systematic Literature Review',
    tag: 'Seminar', shortDate: '30 Aug', date: '30 August 2026', mode: 'Online', duration: '1 Day', fee: '₦5,000',
    summary: 'Practical SLR writing and publication session.',
    description: 'Practical session on systematic literature review design, searching, screening, synthesis and publication.',
    imageBg: 'linear-gradient(135deg,#ff861b,#ffc27d)',
  },
  {
    id: 'spss', heading: 'SPSS',
    title: 'Data Analysis with SPSS for Researchers',
    fullTitle: 'Data Analysis with SPSS for Researchers',
    tag: 'Workshop', shortDate: '10 Sep', date: '10 September 2026', mode: 'Online', duration: '2 Days', fee: '₦7,500',
    summary: 'Hands-on statistical analysis workshop.',
    description: 'Hands-on workshop on selecting, running and interpreting common statistical analyses.',
  },
];
