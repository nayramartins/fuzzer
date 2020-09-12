import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { AuthGuard } from './auth.guard';

@Injectable()
export class AuthService {
  public httpOptions;

  public spotifyAPI = 'https://api.spotify.com/v1/';

  constructor(private http: HttpClient,
    private cookieService: CookieService,
    private authGuard: AuthGuard) {

    this.authGuard.userToken.subscribe(userToken => {
      this.setHeaders(userToken)
    });  
  }

  login() {
    const { clientId, redirectUri, scopes } = environment.spotify
    let loginURL = 'https://accounts.spotify.com/en/authorize?response_type=token&client_id=' +
    clientId + '&redirect_uri=' + encodeURIComponent(redirectUri) +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '');
    return window.location.replace(loginURL);
  }

  setHeaders(userToken) {
    this.httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${userToken}`
      })
    }
  }

  getUser() {
    return this.http.get(`${this.spotifyAPI}me`,
      this.httpOptions);
  }
}
