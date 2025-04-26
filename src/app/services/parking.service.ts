import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ParkingSlot } from '../models/parking-slot.model';

@Injectable({ providedIn: 'root' })
export class ParkingService {
  private baseUrl = 'http://localhost:5000/api/user'; // For slots
  private userBaseUrl = 'http://localhost:5000/api/auth'; // For user profile

  constructor(private http: HttpClient) {}

  // ✅ GET all slots
  getCarSlots(): Observable<ParkingSlot[]> {
    return this.http.get<ParkingSlot[]>(`${this.baseUrl}/car`);
  }

  getBikeSlots(): Observable<ParkingSlot[]> {
    return this.http.get<ParkingSlot[]>(`${this.baseUrl}/bike`);
  }

  // ✅ BOOK slot (send correct vehicleNumber key)
  bookCarSlot(slotId: string, vehicleNumber: string, bookedByName: string): Observable<any> {
    const body = { vehicleNumber, bookedByName };
    return this.http.put(`${this.baseUrl}/book-car-slot/${slotId}`, body);
  }

  bookBikeSlot(slotId: string, vehicleNumber: string, bookedByName: string): Observable<any> {
    const body = { vehicleNumber, bookedByName };
    return this.http.put(`${this.baseUrl}/book-bike-slot/${slotId}`, body);
  }

  // ✅ EXIT slot
  exitCarSlot(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/exit-car-slot/${id}`, {});
  }

  exitBikeSlot(id: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/exit-bike-slot/${id}`, {});
  }

  // 🔁 Frontend-only price support (fallback if needed)
  getPrice(type: 'car' | 'bike'): number {
    const car = localStorage.getItem('carRate');
    const bike = localStorage.getItem('bikeRate');
    return type === 'car' ? +car! || 50 : +bike! || 30;
  }

  // 🚀 USER vehicle management added here 🔥

  // ✅ Get current logged-in user (for vehicle numbers)
  getCurrentUser(): Observable<any> {
    return this.http.get<any>(`${this.userBaseUrl}/current`);
  }

  // ✅ Update user's bikeNumber and carNumber
  updateVehicleNumbers(payload: { bikeNumber: string, carNumber: string }): Observable<any> {
    return this.http.put(`${this.userBaseUrl}/update-vehicle-numbers`, payload);
  }
}
