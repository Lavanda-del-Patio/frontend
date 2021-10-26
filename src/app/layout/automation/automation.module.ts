import { AutomationShowComponent } from './automation-shows/automation-show/automation-show.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AutomationFilmsComponent } from './automation-films/automation-films.component';
import { AutomationFilmComponent } from './automation-films/automation-film/automation-film.component';

import { AutomationShowsComponent } from './automation-shows/automation-shows.component';
import { AngularMaterialModule } from './../../angular-material.module';
import { FloatPlayerModule } from '../../shared/modules/float-player/float-player.module';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { LayoutModule } from '../layout.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutomationRoutingModule } from './automation-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
  imports: [
    CommonModule,
    AutomationRoutingModule,
    MatButtonModule,
    MatDividerModule,
    LayoutModule,
    MatTableModule,
    MatDividerModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    FloatPlayerModule,
    MatDialogModule,
    AngularMaterialModule,
    InfiniteScrollModule,
    FlexLayoutModule
  ],
  declarations: [
    AutomationShowsComponent,
    AutomationShowComponent,
    AutomationFilmsComponent,
    AutomationFilmComponent

  ]
})
export class AutomationModule { }
