import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-delete-media',
  templateUrl: './dialog-delete-media.component.html',
  styleUrls: ['./dialog-delete-media.component.scss']
})
export class DialogDeleteMediaComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogDeleteMediaComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
  }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  confirmDelete(): void {
    this.dialogRef.close(true)
  }
}
