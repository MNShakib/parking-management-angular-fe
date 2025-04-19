import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../services/parking.service';
import { ParkingSlot } from '../../models/parking-slot.model';

@Component({
  selector: 'app-booking',
  standalone  : false,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: ParkingSlot[] = [];

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.refreshBookings();
  }

  trackById(index: number, slot: ParkingSlot): number {
    return slot.id;
  }
  
  getDuration(start: string): number {
    const startTime = new Date(start);
    const endTime = new Date();
    return Math.ceil((endTime.getTime() - startTime.getTime()) / 3600000);
  }

  getBill(slot: ParkingSlot): number {
    const rate = this.parkingService.getPrice(slot.type);
    const hours = this.getDuration(slot.bookingInfo!.startTime);
    const base = rate * hours;
    return base + base * 0.18;
  }

  exit(slot: ParkingSlot): void {
    this.parkingService.exitSlot(slot.id, slot.type);
    alert(`Payment for Slot ${slot.id}: ₹${this.getBill(slot).toFixed(2)}`);
    this.refreshBookings();
  }
  

  refreshBookings(): void {
    const allSlots = this.parkingService.getSlots();
    this.bookings = allSlots.filter(slot => slot.isBooked && slot.bookingInfo);
  }
}
