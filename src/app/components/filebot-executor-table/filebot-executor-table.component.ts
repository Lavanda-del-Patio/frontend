import { MatSnackBar } from '@angular/material/snack-bar';
import { FilebotService } from '../../shared/services/filebot.service';
import {
  FeedFilm,
  Type,
  TorrentPage,
  Torrent,
} from '../../shared/models/feed-film.model';
import { Inject, Component, OnInit, Input, ViewChild, Output, EventEmitter, AfterViewInit } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { DialogDeleteMediaComponent } from '../dialog-delete-media/dialog-delete-media.component';
import { MatTable } from '@angular/material/table';
import { FilebotExecutorService } from 'src/app/shared/services/filebot-executor.service';
import { FilebotExecutor } from 'src/app/shared/models/filebot-executor.model';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { PageEvent } from '@angular/material/paginator';

export interface TypeContent {
  key: Type;
  value: string;
}



export interface TorrentPageContent {
  key: TorrentPage;
  value: string;
}


export interface PageableData {
  filebots: FilebotExecutor[];
  loading: boolean;
}

@Component({
  selector: 'filebot-executor-table-app',
  templateUrl: './filebot-executor-table.component.html',
  styleUrls: ['./filebot-executor-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class FilebotExecutorTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['path', 'newPath', 'fileName', 'newFileName', 'status', 'delete', 'reExecute'];

  @Input() pageSize: number;
  @Input() paginator: boolean;

  resultsLength = 0;
  data: PageableData = {
    filebots: [],
    loading: false,
  };

  constructor(
    private filebotExecutorService: FilebotExecutorService,
    private snackBar: MatSnackBar) {

  }

  ngOnInit(): void {


  }

  ngAfterViewInit() {
    this.data.loading = true;
    this.filebotExecutorService.getAllByPageable(0, this.pageSize).subscribe(
      (nextNews) => {
        const contentData = nextNews.content;
        contentData.forEach(element => {
          element.path = element.path.substring(element.path.lastIndexOf('/') + 1);
          console.log(element.path);
        });
        this.data.filebots = contentData;
        this.data.loading = false;
        this.resultsLength = nextNews.totalElements;
      },
      (error) =>
        this.snackBar.open('No data to display', undefined, { duration: 4000 })
    );

  }


  // pageEvents(event: any) {
  //   console.log()
  //   this.pageEventToParent.emit(event);

  // }

  reExecute(filebotExecutor: FilebotExecutor) {
    this.filebotExecutorService
      .reExecute(filebotExecutor.id)
      .subscribe(
        (data) => {
          this.snackBar.open('Re-executed', '', {
            duration: 2000,
          });
          filebotExecutor = data;
        }
      );
  }

  delete() {

  }

  pageEvents(event) {
    console.log("PAGE EVENT")
    if (this.data.loading) { return; }

    this.data.loading = true;
    this.filebotExecutorService.getAllByPageable(event.pageIndex, this.pageSize).subscribe(
      (nextNews) => {
        const contentData = nextNews.content;
        contentData.forEach(element => {
          element.path = element.path.substring(element.path.lastIndexOf('/') + 1);
          console.log(element.path);
        });
        this.data.filebots = contentData;
        this.data.loading = false;
        this.resultsLength = nextNews.totalElements;
      },
      (error) =>
        this.snackBar.open('No data to display', undefined, { duration: 4000 })
    );
  }
}
