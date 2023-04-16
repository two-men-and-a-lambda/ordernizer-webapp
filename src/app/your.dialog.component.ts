import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-your-task-dialog',
  template: `
    <h2>You entered a sale</h2>
    <button (click)="onClose()">Cancel</button>
    <button (click)="onClose()">Done</button>
  `,
  styleUrls: []
})
export class YourDialogComponent {

  constructor(public dialogRef: MatDialogRef<YourDialogComponent>) { }

  onClose(): void {
    this.dialogRef.close();
  }
}