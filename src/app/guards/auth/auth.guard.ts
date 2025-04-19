import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const requiredRole = route.data['role'];
    const userRole = localStorage.getItem('role');
    if (requiredRole && userRole !== requiredRole) {
      this.router.navigate(['/']);
      return false;
    }
    return true;
  }
}
