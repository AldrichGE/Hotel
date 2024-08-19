import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalityService {
  private apiUrl = 'http://localhost:8080/api/v1/hotel/hospitality';

  constructor(private http: HttpClient) {}

  getHospitalities(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createHospitality(hospitality: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, hospitality);
  }

  updateHospitality(id: number, hospitality: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, hospitality);
  }

  deleteHospitality(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
