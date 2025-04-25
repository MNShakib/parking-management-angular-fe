import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PriceService {
  private baseUrl = 'http://localhost:5000/api/prices';

  constructor(private http: HttpClient) {}

  getAllPrices(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getPrice(vehicleType: 'car' | 'bike'): Observable<any> {
    return this.http.get(`${this.baseUrl}/${vehicleType}`);
  }

  updatePrice(vehicleType: 'car' | 'bike', pricePerHour: number): Observable<any> {
    return this.http.put(`${this.baseUrl}/${vehicleType}`, { pricePerHour });
  }
}
