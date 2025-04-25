import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { ParkingService } from '../../services/parking.service';
import { ParkingSlot } from '../../models/parking-slot.model';
import { VehicleInputModalComponent } from '../vehicle-input-modal/vehicle-input-modal.component';

@Component({
  selector: 'app-user-dashboard',
  standalone:false,
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  currentUser = localStorage.getItem('username') || 'User';
  sidebarCollapsed = false;

  carSlots: ParkingSlot[] = [];
  bikeSlots: ParkingSlot[] = [];

  carPage = 0;
  bikePage = 0;
  carPerPage = 5;
  bikePerPage = 5;

  constructor(
    private dialog: MatDialog,
    private parkingService: ParkingService
  ) {}

  ngOnInit(): void {
    this.loadSlots();
  }

  loadSlots(): void {
    this.parkingService.getCarSlots().subscribe(car => {
      this.carSlots = car.map(s => ({ ...s, type: 'car' }));
    });

    this.parkingService.getBikeSlots().subscribe(bike => {
      this.bikeSlots = bike.map(s => ({ ...s, type: 'bike' }));
    });
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }
  book(slot: ParkingSlot): void {
    if (slot.isBooked) return;
  
    console.log("local storage============>" + localStorage.getItem('username'));
  
    const ref = this.dialog.open(VehicleInputModalComponent, {
      width: '280px'
    });
  
    ref.afterClosed().subscribe(vehicleNumber => {
      if (!vehicleNumber) return;
  
      const bookedByName = this.currentUser;
  
      const request$ = slot.type === 'car'
        ? this.parkingService.bookCarSlot(slot._id, vehicleNumber, bookedByName)
        : this.parkingService.bookBikeSlot(slot._id, vehicleNumber, bookedByName);
  
      request$.subscribe({
        next: () => this.loadSlots(),
        error: err => {
          const message = err?.error?.message || 'Failed to book slot';
          alert(`❌ Booking Failed: ${message}`);
        }
      });
    });
  }
  
  

  onCarPageChange(event: PageEvent): void {
    this.carPage = event.pageIndex;
    this.carPerPage = event.pageSize;
  }

  onBikePageChange(event: PageEvent): void {
    this.bikePage = event.pageIndex;
    this.bikePerPage = event.pageSize;
  }

  goToNextBikePage(): void {
    if ((this.bikePage + 1) * this.bikePerPage < this.bikeSlots.length) {
      this.bikePage++;
    }
  }

  goToPreviousBikePage(): void {
    if (this.bikePage > 0) {
      this.bikePage--;
    }
  }

  goToNextCarPage(): void {
    if ((this.carPage + 1) * this.carPerPage < this.carSlots.length) {
      this.carPage++;
    }
  }

  goToPreviousCarPage(): void {
    if (this.carPage > 0) {
      this.carPage--;
    }
  }

  paginatedCarSlots(): ParkingSlot[] {
    const start = this.carPage * this.carPerPage;
    return this.carSlots.slice(start, start + this.carPerPage);
  }

  paginatedBikeSlots(): ParkingSlot[] {
    const start = this.bikePage * this.bikePerPage;
    return this.bikeSlots.slice(start, start + this.bikePerPage);
  }
}
