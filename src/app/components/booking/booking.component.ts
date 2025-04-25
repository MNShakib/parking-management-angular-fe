import { Component, OnInit } from '@angular/core';
import { ParkingService } from '../../services/parking.service';
import { ParkingSlot } from '../../models/parking-slot.model';

@Component({
  selector: 'app-booking',
  standalone: false,
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css']
})
export class BookingComponent implements OnInit {
  bookings: ParkingSlot[] = [];

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.refreshBookings();
  }

  trackById(index: number, slot: ParkingSlot): string {
    return slot._id;
  }

  getDuration(bookedAt: string | Date | null | undefined): number {
    if (!bookedAt) return 0;
    const startTime = new Date(bookedAt).getTime();
    const now = new Date().getTime();
    const hours = (now - startTime) / (1000 * 60 * 60);
    return Math.max(1, Math.ceil(hours));
  }
  
  getBill(slot: any): number {
    const rate = this.parkingService.getPrice(slot.type);
    const hours = this.getDuration(slot.bookedAt || undefined);
    const base = rate * hours;
    return Math.round(base + base * 0.18); // includes GST
  }
  

  exit(slot: ParkingSlot): void {
    const request$ = slot.type === 'car'
      ? this.parkingService.exitCarSlot(slot._id)
      : this.parkingService.exitBikeSlot(slot._id);

    request$.subscribe({
      next: () => {
        const bill = this.getBill(slot);
        alert(`Payment for Slot ${slot.number}: ₹${bill}`);
        this.refreshBookings();
      },
      error: err => alert(err.error?.message || 'Exit failed.')
    });
  }

  refreshBookings(): void {
    this.parkingService.getCarSlots().subscribe(carSlots => {
      const cars = carSlots.map(slot => ({ ...slot, type: 'car' as 'car' }));
  
      this.parkingService.getBikeSlots().subscribe(bikeSlots => {
        const bikes = bikeSlots.map(slot => ({ ...slot, type: 'bike' as 'bike' }));
  
        const allSlots = [...cars, ...bikes];
        this.bookings = allSlots.filter(slot => slot.isBooked && slot.bookedAt);
      });
    });
  }
  
}
