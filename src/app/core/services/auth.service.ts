import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthService {
  constructor(private router: Router) {
  }

  login() {
    const { clientId, redirectUri, scopes } = environment.spotify
    let loginURL = 'https://accounts.spotify.com/en/authorize?response_type=token&client_id=' +
    clientId + '&redirect_uri=' + encodeURIComponent(redirectUri) +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '');
    return window.location.replace(loginURL);
  }
}