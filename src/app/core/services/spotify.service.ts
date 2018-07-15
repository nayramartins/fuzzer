
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class SpotifyService {
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.cookieService.get("fuzzerToken")}`
    })
  }

  spotifyAPI = 'https://api.spotify.com/v1/';

  constructor(private cookieService: CookieService,
    private http: HttpClient) {
  }

  searchArtist(query) {
    return this.http.get(`${this.spotifyAPI}search?q=${query}&type=artist`, 
      this.httpOptions)
  }
}


         
        