import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {combineLatest, Observable, of} from 'rxjs';
import { AuthService } from '../services/auth.service';
import {map, switchMap, take, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      const authRes = this.authService.isAuthenticated();
      const hasLaunchedRes = this.authService.hasLaunchedApp();
      if (!hasLaunchedRes) {
        this.router.navigate(['/welcome']);
        return false;
      }
      if (!authRes && !hasLaunchedRes) {
        this.router.navigate(['/welcome']);
        return false;
      }
      if (hasLaunchedRes && !authRes) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }

}
