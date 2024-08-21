import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/hotel/auth';

  constructor(private http: HttpClient) {}
  private jwtHelper = new JwtHelperService();

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password })
      .pipe(
        tap((response: any) => {
          if (response && response.token) {
            localStorage.setItem('authToken', response.token);
            localStorage.setItem('userId', response.userId);
            localStorage.setItem('userRole', this.jwtHelper.decodeToken(response.token).role);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
  }

  getToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('authToken');
    }
    return null;
  }

  getUserId(): number | null {
    const token = this.getToken();
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken ? decodedToken.id : null;
    }
    return null;
  }

  getUserRole(): string | null {
    return localStorage.getItem('userRole');
  }

  isAdminOrEmployee(): boolean {
    const role = this.getUserRole();
    return role === 'ADMINISTRATOR' || role === 'EMPLOYEE';
  }

  isAdministrator(): boolean {
    const role = this.getUserRole();
    return role === 'ADMINISTRATOR';
  }

  register(userData: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post(`${this.apiUrl}/register`, userData, { headers });
  }
}
