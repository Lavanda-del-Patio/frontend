import { FilebotComponent } from './filebot/filebot.component';
import { FeedMetadataComponent } from './../components/feed-metadata/feed-metadata.component';
import { FeedTorrentDialogComponent } from '../components/feed-torrent-dialog/feed-torrent-dialog.component';
import { CardShowComponent } from './../components/card-show/card-show.component';
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
import { CardFilmComponent } from '../components/card-film/card-film.component';
import { FlatMediaComponent } from '../components/flat-media/flat-media.component';
import { FeedMetadataDialogComponent } from '../components/feed-metadata-dialog/feed-metadata-dialog.component';

import { TranscodeMediaComponent } from '../components/transcode-media/transcode-media.component';
import { CardFilmWithoutTitleComponent } from '../components/card-film-without-title/card-film-without-title.component';
import { TorrentDataComponent } from '../components/torrent-data/torrent-data.component';
import { FilebotTableComponent } from '../components/filebot-table/filebot-table.component';
import { FilebotExecutorComponent } from '../components/filebot-executor/filebot-executor.component';
import { FilebotExecutorTableComponent } from '../components/filebot-executor-table/filebot-executor-table.component';

import { CardWithoutTitleComponent } from '../components/card-without-title/card-without-title.component';
import { TorrentShowDataComponent } from '../components/torrent-show-data/torrent-show-data.component';
import { TorrentShowChapterDataComponent } from '../components/torrent-show-chapter-data/torrent-show-chapter-data.component';
import { DialogAddQbittorrentComponent } from '../components/dialog-add-qbittorrent/dialog-add-qbittorrent.component';
import { DialogEditFilebotExecutorComponent } from '../components/dialog-edit-filebot-executor/dialog-edit-filebot-executor.component';

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
    CardFilmComponent,
    CardFilmWithoutTitleComponent,
    CardShowComponent,
    CardWithoutTitleComponent,
    FeedMetadataComponent,
    TorrentDataComponent,
    TorrentShowDataComponent,
    TorrentShowChapterDataComponent,
    FlatMediaTableComponent,
    FlatMediaComponent,
    DialogAddTranscodesComponent,
    DialogDeleteMediaComponent,
    DialogUploadMediaComponent,
    DialogAddQbittorrentComponent,
    DialogEditFilebotExecutorComponent,
    FeedTorrentDialogComponent,
    FeedMetadataDialogComponent,
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
    FeedMetadataComponent,
    DialogAddTranscodesComponent,
    DialogDeleteMediaComponent,
    DialogUploadMediaComponent,
    DialogAddQbittorrentComponent,
    DialogEditFilebotExecutorComponent,
    TranscoderStatusComponent,
    CardFilmComponent,
    CardFilmWithoutTitleComponent,
    CardShowComponent,
    CardWithoutTitleComponent,
    TorrentDataComponent,
    TorrentShowDataComponent,
    TorrentShowChapterDataComponent,
    FilebotTableComponent,
    FilebotExecutorComponent,
    FilebotExecutorTableComponent
  ]
})
export class LayoutModule { }
