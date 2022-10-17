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
  selector: 'app-dialog-edit-filebot-executor',
  templateUrl: './dialog-edit-filebot-executor.component.html',
  styleUrls: ['./dialog-edit-filebot-executor.component.scss']
})
export class DialogEditFilebotExecutorComponent implements OnInit {

  loading = true;
  allFiles = [];
  categorys = ['radarr', 'tv-sonarr', 'tv-sonarr-en'];
  englishValues = ['true', 'false'];
  qbittorrentFormGroup!: FormGroup;

  constructor(public dialogRef: MatDialogRef<DialogEditFilebotExecutorComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private snackBar: MatSnackBar,
    private readonly filebotExecutorService: FilebotExecutorService) {

  }

  ngOnInit(): void {
    console.log(this.data)
    this.prepareFormControls();
    this.filebotExecutorService.getAllFilebotExecutor().pipe(take(1)).subscribe(
      (files) => {
        this.allFiles = files;
        this.loading = false;
      }
    );
  }
  prepareFormControls() {
    this.qbittorrentFormGroup = this.formBuilder.group({
      file: [this.data.path, Validators.required],
      category: [this.data.category, Validators.required],
      command: [this.data.command, Validators.required],
      // english: [this.data.english, Validators.required],
    });

  }

  cancel() {
    this.dialogRef.close();
  }

  onSubmit() {
    const filebotExecutor = {
      id: this.data.id,
      path: this.qbittorrentFormGroup.get('file')?.value,
      category: this.qbittorrentFormGroup.get('category')?.value,
      command: this.qbittorrentFormGroup.get('command')?.value,
    }
    this.filebotExecutorService.editFilebotExecutor(this.data.id, filebotExecutor,true).pipe(take(1)).subscribe((res) => {
      this.openSnackBar('Edited');
      this.dialogRef.close();
    }
    );
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
