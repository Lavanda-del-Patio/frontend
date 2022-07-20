import { FilebotExecutor } from 'src/app/shared/models/filebot-executor.model';
import { FilebotExecutorService } from './../../shared/services/filebot-executor.service';
import { AfterViewInit, Component, ViewChild, Input } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Filebot } from '../../shared/models/filebot.model';
import { FilebotService } from '../../shared/services/filebot.service';



export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
export interface PageableData {
  filebots: FilebotExecutor[];
  loading: boolean;
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


@Component({
  selector: 'app-filebot-executor',
  templateUrl: './filebot-executor.component.html',
  styleUrls: ['./filebot-executor.component.scss']
})
export class FilebotExecutorComponent implements AfterViewInit {
  displayedColumns: string[] = ['filesName', 'newFilesName', 'status','actions'];
  dataSource = [...ELEMENT_DATA];
  expandedElement: FilebotExecutor | null;


 pageSize: number;
 paginator: boolean;

  resultsLength = 0;
  data: PageableData = {
    filebots: [],
    loading: false,
  };

  constructor(
    private filebotExecutorService: FilebotExecutorService,
    private snackBar: MatSnackBar
  ) {}

  ngAfterViewInit() {

    this.data.loading = true;
    this.filebotExecutorService.getAllByPageable(0, this.pageSize).subscribe(
      (nextNews) => {
        const contentData = nextNews.content;
        this.data.filebots = contentData;
        this.data.loading = false;
        this.resultsLength = nextNews.totalElements;
      },
      (error) =>
        this.snackBar.open('No data to display', undefined, { duration: 4000 })
    );
  }
}
