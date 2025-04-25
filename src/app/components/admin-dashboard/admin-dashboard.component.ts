import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { ParkingService } from '../../services/parking.service';
import { PriceService } from '../../services/price.service';
import { MatDialog } from '@angular/material/dialog';
import { SlotDetailsModalComponent } from '../slot-details-modal/slot-details-modal.component';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  carRate = 0;
  bikeRate = 0;
  carSlotCount = 0;
  bikeSlotCount = 0;

  carSlots: any[] = [];
  bikeSlots: any[] = [];
  bookedSlots: any[] = [];
  visibleSlots: any[] = [];

  constructor(
    private adminService: AdminService,
    private parkingService: ParkingService,
    private priceService: PriceService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPrices();
    this.loadSlots();
  }
  
  loadPrices(): void {
    this.priceService.getPrice('car').subscribe(res => this.carRate = res.pricePerHour);
    this.priceService.getPrice('bike').subscribe(res => this.bikeRate = res.pricePerHour);
  }
  
  loadSlots(): void {
    this.parkingService.getCarSlots().subscribe(carRes => {
      this.carSlots = carRes.map(slot => ({ ...slot, type: 'car' }));
      this.carSlotCount = this.carSlots.length;
      
      this.parkingService.getBikeSlots().subscribe(bikeRes => {
        this.bikeSlots = bikeRes.map(slot => ({ ...slot, type: 'bike' }));
        this.bikeSlotCount = this.bikeSlots.length;
        
        this.bookedSlots = [...this.carSlots, ...this.bikeSlots].filter(slot => slot.isBooked);
      });
    });
  }

  updateCarSettings(): void {
    this.adminService.createCarSlots(this.carSlotCount).subscribe(() => {
      this.priceService.updatePrice('car', this.carRate).subscribe(() => {
        alert('Car settings updated.');
        this.loadSlots();
      });
    });
  }

  updateBikeSettings(): void {
    this.adminService.createBikeSlots(this.bikeSlotCount).subscribe(() => {
      this.priceService.updatePrice('bike', this.bikeRate).subscribe(() => {
        alert('Bike settings updated.');
        this.loadSlots();
      });
    });
  }

  openSlotList(type: 'car' | 'bike'): void {
    this.visibleSlots = type === 'car' ? this.carSlots : this.bikeSlots;
  }

  viewBookingDetails(slot: any, type: string): void {
    console.log('🧪 Selected Slot', slot);

    this.dialog.open(SlotDetailsModalComponent, {
      data: {
        ...slot,
        type
      },
      width: '400px'
    });
    
  }
}
