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
import { Qbittorrent } from 'src/app/shared/models/qbittorrent.model';
import { DialogAddQbittorrentComponent } from '../dialog-add-qbittorrent/dialog-add-qbittorrent.component';
import { DialogEditFilebotExecutorComponent } from '../dialog-edit-filebot-executor/dialog-edit-filebot-executor.component';

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
  displayedColumns: string[] = ['path', 'newPath', 'fileName', 'newFileName', 'status', 'edit', 'delete', 'reExecute'];

  @Input() pageSize: number;
  @Input() paginator: boolean;

  actualPage: number = 0;

  resultsLength = 0;
  data: PageableData = {
    filebots: [],
    loading: false,
  };

  constructor(
    private filebotExecutorService: FilebotExecutorService,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog) {

  }

  ngOnInit(): void {


  }
  reloadData() {
    this.data.loading = true;
    this.filebotExecutorService.getAllByPageable(this.actualPage, this.pageSize).subscribe(
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

  ngAfterViewInit() {
    this.data.loading = true;
    this.filebotExecutorService.getAllByPageable(this.actualPage, this.pageSize).subscribe(
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
      .editFilebotExecutor(filebotExecutor.id, filebotExecutor)
      .subscribe(
        (data) => {
          this.snackBar.open('Re-executed', '', {
            duration: 2000,
          });
          filebotExecutor = data;
        }
      );
  }

  delete(filebotExecutor: FilebotExecutor) {
    const dialogRef = this.matDialog.open(DialogDeleteMediaComponent, {
      width: '50%',
      height: 'auto',
      data: filebotExecutor.path
    });

    dialogRef.afterClosed().subscribe((result) => {
      // this.loadMedia();
      if (result) {
        this.filebotExecutorService.delete(filebotExecutor.id).subscribe(
          (data) => {
            this.snackBar.open('Deleted', '', {
              duration: 2000,
            });
            this.reloadData();
          },
          (error) => {
            this.snackBar.open('Error deleting execution', error, {
              duration: 2000,
            })
          });
      }
      else {
        this.snackBar.open('Not Deleted', undefined, { duration: 4000 })
      }
    });

  }

  edit(filebotExecutor: FilebotExecutor) {
    const dialogRef = this.matDialog.open(DialogEditFilebotExecutorComponent, {
      width: '50%',
      height: 'auto',
      data: {
        id: filebotExecutor.id,
        category: filebotExecutor.category,
        path: filebotExecutor.path,
        command: filebotExecutor.command,
        english: filebotExecutor.english,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  add() {
    const dialogRef = this.matDialog.open(DialogAddQbittorrentComponent, {
      width: '50%',
      height: 'auto',
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.reloadData();
    });
  }


  pageEvents(event) {
    console.log("PAGE EVENT")
    if (this.data.loading) { return; }
    this.data.loading = true;
    this.actualPage = event.pageIndex;
    this.filebotExecutorService.getAllByPageable(this.actualPage, this.pageSize).subscribe(
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
