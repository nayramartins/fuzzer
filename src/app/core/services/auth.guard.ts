
import {of as observableOf,  Observable ,  BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';


@Injectable()
export class AuthGuard implements CanActivate {
  public userToken = new BehaviorSubject<String>('');
  constructor(private router: Router,
    private cookieService: CookieService) {}
  
  canActivate (
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    const token = this.cookieService.get("fuzzerToken")
    this.userToken.next(token);
    if (!token) {
      console.log("access denied")
      this.router.navigate(['/login']);
    } 
    return observableOf(!!token);
   }

}