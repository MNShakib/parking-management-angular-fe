import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AdminService {
  private adminUrl = 'http://localhost:5000/api/admin';

  constructor(private http: HttpClient) {}

  createCarSlots(numberOfSlots: number): Observable<any> {
    return this.http.post(`${this.adminUrl}/car`, { numberOfSlots });
  }

  createBikeSlots(numberOfSlots: number): Observable<any> {
    return this.http.post(`${this.adminUrl}/bike`, { numberOfSlots });
  }

  deleteSlot(id: string): Observable<any> {
    return this.http.delete(`${this.adminUrl}/slots/${id}`);
  }
}
