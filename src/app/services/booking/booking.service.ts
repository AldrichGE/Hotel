import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookingService {

  private apiUrl = 'http://localhost:8080/api/v1/hotel/bookings';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getBookings(): Observable<any[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  createBooking(booking: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    });

    return this.http.post<any>(this.apiUrl, booking, { headers });
  }
  updateBooking(id: number, booking: any): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.put<any>(`${this.apiUrl}/${id}`, booking, { headers });
  }

  deleteBooking(id: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers });
  }

  checkIn(bookingId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    });

    const params = new HttpParams().set('employeeId', this.authService.getUserId()!.toString());

    return this.http.put<any>(`${this.apiUrl}/${bookingId}/checkIn`, null, { headers, params });
  }

  checkOut(bookingId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    });

    const params = new HttpParams().set('employeeId', this.authService.getUserId()!.toString());

    return this.http.put<any>(`${this.apiUrl}/${bookingId}/checkOut`, null, { headers, params });
  }

  cancelBooking(bookingId: number): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`,
      'Content-Type': 'application/json'
    });

    const params = new HttpParams().set('employeeId', this.authService.getUserId()!.toString());

    return this.http.put<any>(`${this.apiUrl}/${bookingId}/cancel`, null, { headers, params });
  }
}
