import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DownloadingSas } from 'src/models/downloading-sas';

@Component({
  selector: 'downloading-sas',
  templateUrl: './downloading-sas.dialog.html'
})
export class DownloadingSasDialog {
  constructor(
    public dialogRef: MatDialogRef<DownloadingSasDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DownloadingSas) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
