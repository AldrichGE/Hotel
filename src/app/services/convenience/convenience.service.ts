import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConvenienceService {
  private apiUrl = 'http://localhost:8080/api/v1/hotel/conveniences';

  constructor(private http: HttpClient) {}

  getConveniences(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  createConvenience(convenience: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, convenience);
  }

  updateConvenience(id: number, convenience: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, convenience);
  }

  deleteConvenience(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
