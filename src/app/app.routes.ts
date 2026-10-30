import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { Programmes } from './pages/programmes/programmes';
import { Resources } from './pages/resources/resources';
import { Events } from './pages/events/events';
import { EventDetails } from './pages/event-details/event-details';
import { Media } from './pages/media/media';
import { Opportunities } from './pages/opportunities/opportunities';
import { Community } from './pages/community/community';
import { Login } from './pages/login/login';

// Routing for every page on the navbar (Requirement 1)
export const routes: Routes = [
  { path: '', component: Home, title: 'YRA | Home' },
  { path: 'about', component: About, title: 'YRA | About' },
  { path: 'programmes', component: Programmes, title: 'YRA | Programmes' },
  { path: 'resources', component: Resources, title: 'YRA | Resources' },
  { path: 'events', component: Events, title: 'YRA | Events' },
  // Route parameter ":id" -> /events/bootcamp, /events/slr, /events/spss
  { path: 'events/:id', component: EventDetails, title: 'YRA | Event Details' },
  { path: 'media', component: Media, title: 'YRA | Media' },
  { path: 'opportunities', component: Opportunities, title: 'YRA | Opportunities' },
  { path: 'community', component: Community, title: 'YRA | Community' },
  { path: 'login', component: Login, title: 'YRA | Login' },
  { path: '**', redirectTo: '' },
];
