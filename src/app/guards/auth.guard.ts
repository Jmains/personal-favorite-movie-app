import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService} from '../services/auth.service'
import { tap, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
  private authService: AuthService,
  private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      // return an observable of type boolean 
      return this.authService.user$.pipe(
        // take the first value emitted
        take(1),
        // convert that value to a boolean
        map(user => !!user), 
        // if the user is not logged in route them to the login page
        tap(user => {
          if(!user) {
            console.log('not logged in routing user to login page');
            this.router.navigate(['/login']);
          }
        })
      );
  }
}