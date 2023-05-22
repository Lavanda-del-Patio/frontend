import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
    ]
  },
  {
    path: 'plex',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./plex/plex.module').then(m => m.PlexModule) },
    ]
  },
  // {
  //   path: 'automation',
  //   component: LayoutComponent,
  //   children: [
  //     { path: '', loadChildren: () => import('./automation/automation.module').then(m => m.AutomationModule) },
  //   ]
  // },
  {
    path: 'filebot',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./filebot-reports/filebot.module').then(m => m.FilebotModule) },
    ]
  },
  {
    path: 'atomohd',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./atomohd/atomohd.module').then(m => m.AtomohdModule) },
    ]
  },
  {
    path: 'filebot-executor',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./filebot-executor/filebot-executor.module').then(m => m.FilebotExecutorModule) },
    ]
  },
  {
    path: 'filebot-executor-v2',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./filebot-executor-v2/filebot-executor.module').then(m => m.FilebotExecutorModule) },
    ]
  },
  {
    path: 'tmdb',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./tmdb/tmdb.module').then(m => m.TMDBModule) },
    ]
  },
  {
    path: 'elastictranscoder',
    component: LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./elastictranscoder/elastictranscoder.module').then(m => m.ElastictranscoderModule) },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]

})
export class LayoutRoutingModule { }
