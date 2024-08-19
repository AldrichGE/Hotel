import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoomService {
  private apiUrl = 'http://localhost:8080/api/v1/hotel/rooms';
  constructor(private http: HttpClient) {}

  getRooms(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
