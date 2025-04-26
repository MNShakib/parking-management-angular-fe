import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  bikeNumber: string = '';
  carNumber: string = '';

  bikeSlot: ParkingSlot | null = null;
  carSlot: ParkingSlot | null = null;

  showExitModal = false;
  selectedSlot: ParkingSlot | null = null;
  selectedType: 'bike' | 'car' | null = null;

  constructor(
    private parkingService: ParkingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserVehicleNumbers();
    this.checkExistingBookings();
  }

  loadUserVehicleNumbers(): void {
    this.parkingService.getCurrentUser().subscribe({
      next: (user) => {
        this.bikeNumber = user.bikeNumber || '';
        this.carNumber = user.carNumber || '';
      },
      error: (err) => {
        console.error('Failed to fetch user vehicle numbers', err);
      }
    });
  }

  checkExistingBookings(): void {
    this.parkingService.getCarSlots().subscribe(carSlots => {
      const myCarSlot = carSlots.find(slot => slot.bookedByName === this.currentUser);
      if (myCarSlot) {
        this.carSlot = myCarSlot;
      }
    });

    this.parkingService.getBikeSlots().subscribe(bikeSlots => {
      const myBikeSlot = bikeSlots.find(slot => slot.bookedByName === this.currentUser);
      if (myBikeSlot) {
        this.bikeSlot = myBikeSlot;
      }
    });
  }

  updateVehicleNumbers(): void {
    const payload = {
      bikeNumber: this.bikeNumber,
      carNumber: this.carNumber
    };

    this.parkingService.updateVehicleNumbers(payload).subscribe({
      next: () => {
        alert('✅ Vehicle numbers updated successfully!');
      },
      error: (err) => {
        console.error('Failed to update vehicle numbers', err);
        alert('❌ Failed to update vehicle numbers.');
      }
    });
  }

  parkBike(): void {
    if (!this.bikeNumber || this.bikeNumber.trim() === '') {
      alert('⚠️ Please enter your bike number before parking.');
      return;
    }
  
    if (this.carSlot) {
      alert('❌ You already have a Car slot booked. Exit it first!');
      return;
    }
  
    this.parkingService.getBikeSlots().subscribe(slots => {
      const availableSlot = slots.find(slot => !slot.isBooked);
      if (availableSlot) {
        this.parkingService.bookBikeSlot(availableSlot._id, this.bikeNumber, this.currentUser).subscribe({
          next: () => {
            alert('✅ Bike parked successfully!');
            this.checkExistingBookings();
          },
          error: (err) => {
            alert('❌ Failed to park bike: ' + (err?.error?.message || 'Unknown error'));
          }
        });
      } else {
        alert('❌ No available bike slots.');
      }
    });
  }
  

  parkCar(): void {
    if (!this.carNumber || this.carNumber.trim() === '') {
      alert('⚠️ Please enter your car number before parking.');
      return;
    }
  
    if (this.bikeSlot) {
      alert('❌ You already have a Bike slot booked. Exit it first!');
      return;
    }
  
    this.parkingService.getCarSlots().subscribe(slots => {
      const availableSlot = slots.find(slot => !slot.isBooked);
      if (availableSlot) {
        this.parkingService.bookCarSlot(availableSlot._id, this.carNumber, this.currentUser).subscribe({
          next: () => {
            alert('✅ Car parked successfully!');
            this.checkExistingBookings();
          },
          error: (err) => {
            alert('❌ Failed to park car: ' + (err?.error?.message || 'Unknown error'));
          }
        });
      } else {
        alert('❌ No available car slots.');
      }
    });
  }
  

  openExitModal(slot: ParkingSlot, type: 'bike' | 'car') {
    this.selectedSlot = slot;
    this.selectedType = type;
    this.showExitModal = true;
  }

  getDuration(bookedAt: string | Date | null | undefined): number {
    if (!bookedAt) return 0;
    const startTime = new Date(bookedAt).getTime();
    const now = new Date().getTime();
    const hours = (now - startTime) / (1000 * 60 * 60);
    return Math.max(1, Math.ceil(hours));
  }

  getBill(slot: ParkingSlot): number {
    const rate = this.parkingService.getPrice(slot.type!);
    const hours = this.getDuration(slot.bookedAt || undefined);
    const base = rate * hours;
    return Math.round(base + base * 0.18); // includes GST
  }

  confirmExit(): void {
    if (!this.selectedSlot || !this.selectedType) return;

    const request$ = this.selectedType === 'bike'
      ? this.parkingService.exitBikeSlot(this.selectedSlot._id)
      : this.parkingService.exitCarSlot(this.selectedSlot._id);

    request$.subscribe({
      next: () => {
        alert(`✅ Payment Successful!`);
        this.showExitModal = false;
        if (this.selectedType === 'bike') {
          this.bikeSlot = null;
        } else {
          this.carSlot = null;
        }
        // this.router.navigate(['/booking']);
      },
      error: (err) => {
        alert('❌ Failed to exit: ' + (err?.error?.message || 'Unknown error'));
      }
    });
  }

  cancelExit(): void {
    this.showExitModal = false;
    this.selectedSlot = null;
    this.selectedType = null;
  }
}
