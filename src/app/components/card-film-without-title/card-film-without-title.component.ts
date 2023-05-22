import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-card-film-without-title',
  templateUrl: './card-film-without-title.component.html',
  styleUrls: ['./card-film-without-title.component.scss']
})
export class CardFilmWithoutTitleComponent implements OnInit {

  // @Input() film!: FeedFilm;

  defaultImage = "/assets/images/default-image-3.png"

  constructor(
    public dialog: MatDialog) {

  }

  ngOnInit(): void {
  }

  getImage() {
    // if (this.film.image === null || this.film.image === 'https://image.tmdb.org/t/p/originalnull') {
    //   return this.defaultImage
    // }
    // else { return this.film.image }

    return 'https://image.tmdb.org/t/p/originalnull';
  }

}
