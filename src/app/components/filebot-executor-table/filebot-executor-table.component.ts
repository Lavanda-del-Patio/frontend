import { MatSnackBar } from '@angular/material/snack-bar';
import { FilebotService } from '../../shared/services/filebot.service';
import { FeedFilm, Type, TorrentPage, Torrent } from '../../shared/models/feed-film.model';
import { Inject, Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { DialogDeleteMediaComponent } from '../dialog-delete-media/dialog-delete-media.component';
import { MatTable } from '@angular/material/table';
import { FilebotExecutorService } from 'src/app/shared/services/filebot-executor.service';
import { FilebotExecutor } from 'src/app/shared/models/filebot-executor.model';
import {animate, state, style, transition, trigger} from '@angular/animations';


export interface TypeContent {
  key: Type
  value: string
}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
  { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
  { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
  { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
  { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
  { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
  { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
  { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
  { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
  { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

export interface TorrentPageContent {
  key: TorrentPage
  value: string
}
@Component({
  selector: 'filebot-executor-table-app',
  templateUrl: './filebot-executor-table.component.html',
  styleUrls: ['./filebot-executor-table.component.scss'],
  animations:[
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class FilebotExecutorTableComponent implements OnInit {
  // displayedColumns: string[] = ['originalName', 'newName', 'newLocation', 'lastModifiedAt'];
  displayedColumns: string[] = ['filesName', 'newFilesName', 'status','actions'];
  dataSource = [...ELEMENT_DATA];
  expandedElement: FilebotExecutor | null;

  @ViewChild(MatTable) table: MatTable<PeriodicElement>;

  @Input() pageSize: number;
  @Input() paginator: boolean;


  constructor(private filebotExecutorService: FilebotExecutorService, private snackBar: MatSnackBar) { }

  addData() {
    const randomElementIndex = Math.floor(Math.random() * ELEMENT_DATA.length);
    this.dataSource.push(ELEMENT_DATA[randomElementIndex]);
    this.table.renderRows();
  }

  removeData() {
    this.dataSource.pop();
    this.table.renderRows();
  }
  resultsLength = 0;
  data: PageableData = {
    filebots: [],
    loading: false,
  };

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    if (this.data.loading) { return; }
    this.data.loading = true;
    this.filebotExecutorService.getAllByPageable(0, this.pageSize).subscribe(nextNews => {
      const contentData = nextNews.content;
      this.data.filebots = contentData;
      this.data.loading = false;
      this.resultsLength = nextNews.totalElements;
    },
      (error) => this.snackBar.open('No data to display', undefined, { duration: 4000 })
    );
  }

  pageEvents(event: any) {
    if (this.data.loading) { return; }

    this.data.loading = true;
    this.filebotExecutorService.getAllByPageable(event.pageIndex, this.pageSize).subscribe(nextNews => {
      const contentData = nextNews.content;
      this.data.filebots = contentData;
      this.data.loading = false;
      this.resultsLength = nextNews.totalElements;
    });
  }
}
export interface PageableData {
  filebots: FilebotExecutor[];
  loading: boolean,
}
