import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';

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
    return Observable.of(!!token);
   }

}