import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../services/parking.service';
import { ParkingSlot } from '../../models/parking-slot.model';

@Component({
  selector: 'app-user-dashboard',
  standalone: false,
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {
  currentUser = localStorage.getItem('username') || 'User';

  carSlots: ParkingSlot[] = [];
  bikeSlots: ParkingSlot[] = [];

  carPage = 1;
  bikePage = 1;

  carPerPage = 6;
  bikePerPage = 6;

  sidebarCollapsed = false;

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.loadSlots();
  }

  loadSlots(): void {
    const slots = this.parkingService.getSlots();
    this.carSlots = slots.filter(s => s.type === 'car');
    this.bikeSlots = slots.filter(s => s.type === 'bike');
  }

  toggleSidebar(): void {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  }

  book(slot: ParkingSlot): void {
    if (!slot.isBooked) {
      const vehicleNo = prompt('Enter Vehicle Number:');
      if (vehicleNo) {
        this.parkingService.bookSlot(slot.id, vehicleNo, slot.type); // <--- pass type
        alert(`Slot ${slot.id} booked successfully!`);
        this.loadSlots();
      }
    } else {
      alert('This slot is already booked.');
    }
  }
  

  paginatedCarSlots(): ParkingSlot[] {
    const start = (this.carPage - 1) * this.carPerPage;
    return this.carSlots.slice(start, start + this.carPerPage);
  }

  paginatedBikeSlots(): ParkingSlot[] {
    const start = (this.bikePage - 1) * this.bikePerPage;
    return this.bikeSlots.slice(start, start + this.bikePerPage);
  }

  carPages(): number[] {
    return Array(Math.ceil(this.carSlots.length / this.carPerPage)).fill(0).map((_, i) => i + 1);
  }

  bikePages(): number[] {
    return Array(Math.ceil(this.bikeSlots.length / this.bikePerPage)).fill(0).map((_, i) => i + 1);
  }
}
