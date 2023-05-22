import { FilebotComponent } from './filebot-reports/filebot.component';
import { AngularMaterialModule } from './../angular-material.module';
import { FloatPlayerModule } from './../shared/modules/float-player/float-player.module';
import { TranscodeMediaTableComponent } from '../components/transcode-media-table/transcode-media-table.component';
import { TranscoderStatusComponent } from '../components/transcoder-status/transcoder-status.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutRoutingModule } from './layout-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from '../components/header/header.component';
import { FlatMediaTableComponent } from '../components/flat-media-table/flat-media-table.component';
import { DialogAddTranscodesComponent } from '../components/dialog-add-transcodes/dialog-add-transcodes.component';
import { DialogDeleteMediaComponent } from '../components/dialog-delete-media/dialog-delete-media.component';
import { DialogUploadMediaComponent } from '../components/dialog-upload-media/dialog-upload-media.component';
import { FlatMediaComponent } from '../components/flat-media/flat-media.component';

import { TranscodeMediaComponent } from '../components/transcode-media/transcode-media.component';
import { CardFilmWithoutTitleComponent } from '../components/card-film-without-title/card-film-without-title.component';
import { FilebotTableComponent } from '../components/filebot-table/filebot-table.component';
import { FilebotExecutorComponent } from '../components/filebot-executor/filebot-executor.component';
import { FilebotExecutorTableComponent } from '../components/filebot-executor-table/filebot-executor-table.component';

import { CardWithoutTitleComponent } from '../components/card-without-title/card-without-title.component';
import { DialogAddQbittorrentComponent } from '../components/dialog-add-qbittorrent/dialog-add-qbittorrent.component';
import { DialogEditFilebotExecutorComponent } from '../components/dialog-edit-filebot-executor/dialog-edit-filebot-executor.component';
import { AtomohdTableComponent } from '../components/atomohd-table/atomohd-table.component';

@NgModule({
  imports: [
    CommonModule,
    LayoutRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FloatPlayerModule,
    FlexLayoutModule,
    AngularMaterialModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    CardFilmWithoutTitleComponent,
    CardWithoutTitleComponent,
    AtomohdTableComponent,
    FlatMediaTableComponent,
    FlatMediaComponent,
    DialogAddTranscodesComponent,
    DialogDeleteMediaComponent,
    DialogUploadMediaComponent,
    DialogAddQbittorrentComponent,
    DialogEditFilebotExecutorComponent,
    TranscoderStatusComponent,
    TranscodeMediaTableComponent,
    TranscodeMediaComponent,
    FilebotTableComponent,
    FilebotExecutorComponent,
    FilebotExecutorTableComponent
  ],
  exports: [
    FlatMediaTableComponent,
    FlatMediaComponent,
    DialogAddTranscodesComponent,
    DialogDeleteMediaComponent,
    DialogUploadMediaComponent,
    AtomohdTableComponent,
    DialogAddQbittorrentComponent,
    DialogEditFilebotExecutorComponent,
    TranscoderStatusComponent,
    CardFilmWithoutTitleComponent,
    CardWithoutTitleComponent,
    FilebotTableComponent,
    FilebotExecutorComponent,
    FilebotExecutorTableComponent
  ]
})
export class LayoutModule { }
