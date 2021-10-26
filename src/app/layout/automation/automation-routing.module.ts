import { AutomationFilmsComponent } from './automation-films/automation-films.component';
import { AutomationShowsComponent } from './automation-shows/automation-shows.component';
import { AutomationFilmComponent } from './automation-films/automation-film/automation-film.component';
import { AutomationShowComponent } from './automation-shows/automation-show/automation-show.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'shows', component: AutomationShowsComponent
  },
  {
    path: 'films', component: AutomationFilmsComponent
  },
  {
    path: 'films/:id', component: AutomationFilmComponent
  },
  {
    path: 'shows/:id', component: AutomationShowComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AutomationRoutingModule {
}
