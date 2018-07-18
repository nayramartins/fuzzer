import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {

  public httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.cookieService.get('fuzzerToken')}`
    })
  }

  public spotifyAPI = 'https://api.spotify.com/v1/';

  constructor(private http: HttpClient,
    private cookieService: CookieService) {
  }

  login() {
    const { clientId, redirectUri, scopes } = environment.spotify
    let loginURL = 'https://accounts.spotify.com/en/authorize?response_type=token&client_id=' +
    clientId + '&redirect_uri=' + encodeURIComponent(redirectUri) +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '');
    return window.location.replace(loginURL);
  }

  getUser() {
    return this.http.get(`${this.spotifyAPI}me`,
      this.httpOptions);
  }
}
