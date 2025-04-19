import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../services/parking.service';
import { ParkingSlot } from '../../models/parking-slot.model';

@Component({
  selector: 'app-admin-dashboard',
  standalone  : false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  carRate = 0;
  bikeRate = 0;
  carSlotCount = 0;
  bikeSlotCount = 0;

  carSlots: ParkingSlot[] = [];
  bikeSlots: ParkingSlot[] = [];

  selectedSlot?: ParkingSlot;

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.carRate = this.parkingService.getPrice('car');
    this.bikeRate = this.parkingService.getPrice('bike');
    this.loadSlots();
  }

  loadSlots(): void {
    const slots = this.parkingService.getSlots();
    this.carSlots = slots.filter(s => s.type === 'car');
    this.bikeSlots = slots.filter(s => s.type === 'bike');
    this.carSlotCount = this.carSlots.length;
    this.bikeSlotCount = this.bikeSlots.length;
  }

  updateSlotCounts(): void {
    this.parkingService.updateSlotCount('car', this.carSlotCount);
    this.parkingService.updateSlotCount('bike', this.bikeSlotCount);
    this.loadSlots();
  }

  updatePrices(): void {
    this.parkingService.setPrice('car', this.carRate);
    this.parkingService.setPrice('bike', this.bikeRate);
  }

  viewBookingDetails(slot: ParkingSlot): void {
    if (slot.isBooked && slot.bookingInfo) {
      this.selectedSlot = slot;
      alert(`Slot ID: ${slot.id}\nVehicle: ${slot.bookingInfo.vehicleNo}\nFrom: ${slot.bookingInfo.startTime}`);
    }
  }
}