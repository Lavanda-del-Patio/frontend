import { OktaAuthGuard } from './app.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
const CALLBACK_PATH = 'callback';

const routes: Routes = [
  // {
  //   path: CALLBACK_PATH,
  //   component: CallbackComponent,
  // },
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full', canActivate: [OktaAuthGuard] },
  { path: '', loadChildren: () => import('./layout/layout.module').then(m => m.LayoutModule), canActivate: [OktaAuthGuard] }
  ,
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
