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
    {
        path: 'automation',
        component: LayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./automation/automation.module').then(m => m.AutomationModule) },
        ]
    },
    {
        path: 'filebot',
        component: LayoutComponent,
        children: [
            { path: '', loadChildren: () => import('./filebot/filebot.module').then(m => m.FilebotModule) },
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
