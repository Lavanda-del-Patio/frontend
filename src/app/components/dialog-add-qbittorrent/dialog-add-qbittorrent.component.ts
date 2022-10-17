import { MatSnackBar } from '@angular/material/snack-bar';
import { FlatMedia } from '../../shared/models/flatmedia.model';
import { Transcode } from '../../shared/models/transcode-selected.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranscodeApi } from '../../shared/models/transcode.model';
import { MediaService } from '../../shared/services/media.service';
import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { take, finalize } from 'rxjs/operators';
import { } from 'buffer';
import { FilebotExecutorService } from 'src/app/shared/services/filebot-executor.service';
@Component({
  selector: 'app-dialog-add-qbittorrent',
  templateUrl: './dialog-add-qbittorrent.component.html',
  styleUrls: ['./dialog-add-qbittorrent.component.scss']
})
export class DialogAddQbittorrentComponent implements OnInit {

  loading = true;
  allFiles = [];
  categorys = ['radarr', 'tv-sonarr', 'tv-sonarr-en']
  qbittorrentFormGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogAddQbittorrentComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private readonly filebotExecutorService: FilebotExecutorService) {

  }

  ngOnInit(): void {
    this.filebotExecutorService.getAllFilebotExecutor().pipe(take(1)).subscribe(
      (files) => {
        this.allFiles = files;
        this.prepareFormControls();
        this.loading = false;
      }
    );
  }
  prepareFormControls() {
    this.qbittorrentFormGroup = this.formBuilder.group({
      file: [null, Validators.required],
      category: [null, Validators.required]
    });

  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    this.filebotExecutorService.createQbittorrent(
      { category: this.qbittorrentFormGroup.value.category, id: this.createId(), name: this.qbittorrentFormGroup.value.file }
    ).subscribe((res) => {
      this.openSnackBar('Added to Qbittorrent');
      this.dialogRef.close();
    }
    );
  }

  createId(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  private openSnackBar(message: string, action?: string) {
    if (action) {
      this.snackBar.open(message, action, { duration: 2000 });
    } else {
      this.snackBar.open(message);
      setTimeout(() => {
        this.snackBar.dismiss();
      }, 2000);
    }
  }

}
