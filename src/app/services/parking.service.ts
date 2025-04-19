import { Injectable } from '@angular/core';
import { ParkingSlot } from '../models/parking-slot.model';

@Injectable({ providedIn: 'root' })
export class ParkingService {
  private carPrice = 50;
  private bikePrice = 30;
  private slots: ParkingSlot[] = [];

  constructor() {
    const saved = localStorage.getItem('parking_slots');
    if (saved) this.slots = JSON.parse(saved);

    const car = localStorage.getItem('car_price');
    const bike = localStorage.getItem('bike_price');
    if (car) this.carPrice = +car;
    if (bike) this.bikePrice = +bike;
  }

  getSlots(): ParkingSlot[] {
    return this.slots;
  }

  createSlots(type: 'car' | 'bike', count: number): void {
    const newSlots: ParkingSlot[] = [];
    for (let i = 0; i < count; i++) {
      newSlots.push({
        id: i+1,
        type,
        row: 1,
        number: i + 1,
        isBooked: false
      });
    }
    this.slots = [...this.slots, ...newSlots];
    this.save();
  }

  updateSlotCount(type: 'car' | 'bike', newCount: number): void {
    this.slots = this.slots.filter(slot => slot.type !== type);
    this.createSlots(type, newCount);
  }

  bookSlot(id: number, vehicleNo: string, type: 'car' | 'bike'): void {
    const index = this.slots.findIndex(s => s.id === id && s.type === type);
    if (index !== -1) {
      this.slots[index].isBooked = true;
      this.slots[index].bookingInfo = {
        vehicleNo,
        startTime: new Date().toISOString(),
      };
      this.save();
    }
  }
  

  exitSlot(id: number, type: 'car' | 'bike'): void {
    const index = this.slots.findIndex(s => s.id === id && s.type === type);
    if (index !== -1 && this.slots[index].isBooked) {
      this.slots[index].isBooked = false;
      this.slots[index].bookingInfo!.endTime = new Date().toISOString();
      this.save();
    }
  }
  

  setPrice(type: 'car' | 'bike', price: number): void {
    if (type === 'car') {
      this.carPrice = price;
      localStorage.setItem('car_price', price.toString());
    } else {
      this.bikePrice = price;
      localStorage.setItem('bike_price', price.toString());
    }
  }

  getPrice(type: 'car' | 'bike'): number {
    return type === 'car' ? this.carPrice : this.bikePrice;
  }

  private save(): void {
    localStorage.setItem('parking_slots', JSON.stringify(this.slots));
  }
}