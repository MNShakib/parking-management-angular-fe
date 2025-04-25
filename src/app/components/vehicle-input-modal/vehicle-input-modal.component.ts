// vehicle-input-modal/vehicle-input-modal.component.ts
import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-vehicle-input-modal',
  standalone: false,
  templateUrl: './vehicle-input-modal.component.html',
  styleUrls: ['./vehicle-input-modal.component.css']
})
export class VehicleInputModalComponent {
  vehicleNumber = '';

  constructor(
    public dialogRef: MatDialogRef<VehicleInputModalComponent>
  ) {}

  confirm(): void {
    this.dialogRef.close(this.vehicleNumber);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}