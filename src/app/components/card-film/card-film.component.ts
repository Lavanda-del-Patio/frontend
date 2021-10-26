import { DatePipe } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatIconRegistry } from "@angular/material/icon";
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { FeedFilm } from './../../shared/models/feed-film.model';
import { FeedFilmsService } from './../../shared/services/feed-films.service';

@Component({
  selector: 'app-card-film',
  templateUrl: './card-film.component.html',
  styleUrls: ['./card-film.component.scss'],
  providers: [DatePipe]
})
export class CardFilmComponent implements OnInit {

  @Input() film!: FeedFilm;
  @Output() deleted = new EventEmitter<string>();
  @Output() updated = new EventEmitter<FeedFilm>();
  dateParsed!: string;
  imageConverted!: string;
  contains4K!: boolean;
  containsHDR!: boolean;
  isDownloaded!: boolean;
  isFilm!: boolean;
  isShow!: boolean;
  defaultImage = "/assets/images/default-image-3.png"

  constructor(
    public dialog: MatDialog,
    private readonly feedFilmsService: FeedFilmsService,
    private snackBar: MatSnackBar,
    private datePipe: DatePipe,
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
    this.matIconRegistry.addSvgIcon(
      "plextv",
      this.domSanitizer.bypassSecurityTrustResourceUrl("../assets/svg/plextv.svg")
    );
  }
  ngOnInit(): void {
    this.dateParsed = this.getAddedDate();
    this.imageConverted = this.getImage();
    this.contains4K = this.torrentsContains4K();
    this.containsHDR = this.torrentContainsHDR();
    this.isFilm = this.isTypeFilm();
    this.isShow = this.isTypeShow();
    this.isDownloaded = this.torrentIsDownloaded();
  }

  private getImage(): string {
    if (this.film.image === null || this.film.image === 'https://image.tmdb.org/t/p/originalnull') {
      return this.defaultImage
    }
    else {
      return this.film.image
    }
  }

  private isTypeFilm(): boolean {
    if (this.film.type) {
      return 'FILM' === this.film.type.valueOf();
    }
    return false;
  }

  private isTypeShow(): boolean {
    if (this.film.type) {
      return 'SHOW' === this.film.type.valueOf();
    }
    return false;
  }

  private torrentIsDownloaded(): boolean {
    return this.film.torrents.some(torrent => torrent.downloaded && torrent.assignToDownload);
  }

  private torrentsContains4K(): boolean {
    return this.film.torrents.some(torrent => torrent.torrentQuality.includes('4K'));
  }

  private torrentContainsHDR(): boolean {
    return this.film.torrents.some(torrent => torrent.torrentUrl.includes('HDR'));
  }

  private getAddedDate(): string {
    let lastModifiedAt = this.film.createdAt;
    if (lastModifiedAt) {
      let dateNow = new Date();
      let lastModifiedAtOnDate = new Date(lastModifiedAt);
      let comparative = dateNow.getTime() - lastModifiedAtOnDate.getTime();
      let days = comparative / (1000 * 60 * 60 * 24);
      if (days < 1) {
        return 'Today'
      }
      else if (days == 1) {
        return 'Yesterday'
      }
      else {
        return this.datePipe.transform(this.film.lastModifiedAt, 'dd/MM/yyyy')!;
      }
    }
    else
      return 'NO DATE';
  }
}
