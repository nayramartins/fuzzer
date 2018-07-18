
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class SpotifyService {
  httpOptions = {
    headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.cookieService.get('fuzzerToken')}`
    })
  }

  spotifyAPI = 'https://api.spotify.com/v1/';

  constructor(private cookieService: CookieService,
    private http: HttpClient) {
  }

  searchArtist(query) {
    return this.http.get(`${this.spotifyAPI}search?q=${query}&type=artist`,
      this.httpOptions);
  }

  getTopSongs(id) {
    return this.http.get(`${this.spotifyAPI}artists/${id}/top-tracks?country=US`,
      this.httpOptions);
  }

  getUserId() {
    return this.http.get(`${this.spotifyAPI}me`,
      this.httpOptions);
  }

  createMagicPlaylist(userId) {
    return this.http.post(`${this.spotifyAPI}users/${userId}/playlists`,
      {
        "name": "Magic Playlist",
        "description": "New playlist description",
        "public": false
      },
      this.httpOptions)
  }

  setMusic(userId, playlistId, songs) {
    const data = songs.toString();
    return this.http.post(`${this.spotifyAPI}users/${userId}/playlists/${playlistId}/tracks?uris=${encodeURI(data)}`, {},
      this.httpOptions)
  }
}



