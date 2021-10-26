import { FeedFilm, Type, TorrentPage, Torrent } from '../../shared/models/feed-film.model';
import { Inject, Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';


export interface TypeContent {
  key: Type
  value: string
}

export interface TorrentPageContent {
  key: TorrentPage
  value: string
}
@Component({
  selector: 'feed-metadata-dialog',
  templateUrl: './feed-metadata-dialog.component.html',
  styleUrls: ['./feed-metadata-dialog.component.scss']
})

export class FeedMetadataDialogComponent implements OnInit {

  types: TypeContent[] = [];
  torrentPages: TorrentPageContent[] = [];
  feedFilm: any = undefined;

  constructor(
    public dialogRef: MatDialogRef<FeedMetadataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,

  ) {
    this.feedFilm = data.feedFilm;
  }
  ngOnInit(): void {
    this.types = [
      { key: Type.FILM, value: "Film" },
      { key: Type.SHOW, value: "Show" }
    ];
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  selectionChanged(sel: MatSelectChange) {
    console.log(sel.value)
  }
}
