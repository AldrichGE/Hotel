import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRoles = route.data['roles'] as Array<string>;
    const userRole = this.authService.getUserRole();

    if (userRole && expectedRoles.includes(userRole)) {
      return true;
    } else {
      this.router.navigate(['/newReserve']);
      return false;
    }
  }
}