import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Hotel';

  constructor(private router: Router, private authService: AuthService) {}

  isLandingPage(): boolean {
    return this.router.url === '/';
  }

  isLoginPage(): boolean {
    return this.router.url === '/login';
  }

  isRegisterPage(): boolean {
    return this.router.url === '/register';
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
    console.log("Logout bem sucedido.");
  }
}
