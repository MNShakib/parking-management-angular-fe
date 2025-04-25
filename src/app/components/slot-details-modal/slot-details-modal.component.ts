import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-slot-details-modal',
  standalone: false,
  templateUrl: './slot-details-modal.component.html',
  styleUrls: ['./slot-details-modal.component.css']
})
export class SlotDetailsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<SlotDetailsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  close(): void {
    this.dialogRef.close();
  }
}
