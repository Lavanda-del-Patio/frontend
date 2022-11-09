import { FilebotExecutor } from 'src/app/shared/models/filebot-executor.model';
import { FilebotExecutorService } from '../../shared/services/filebot-executor.service';
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
@Component({
  selector: 'app-tmdb',
  templateUrl: './tmdb.component.html',
  styleUrls: ['./tmdb.component.scss']
})
export class TMDBComponent  {
  displayedColumns: string[] = ['filesName', 'newFilesName', 'status', 'actions'];
  dataSource = [];
  expandedElement: FilebotExecutor | null;


  pageSize: number = 20;
  paginator: boolean;

  resultsLength = 0;
  data: PageableData = {
    filebots: [],
    loading: false,
  };

  constructor(
    private filebotExecutorService: FilebotExecutorService,
    private snackBar: MatSnackBar
  ) { }


}
