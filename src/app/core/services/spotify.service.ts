
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';


@Injectable()
export class SpotifyService {

  selectedArtists = new BehaviorSubject<any>(null);

  selectedSongs = new BehaviorSubject<any>(null);

  playlistId = new BehaviorSubject<any>(null);

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

  createMagicPlaylist(userId, playlistName, playlistDescription, playlistPrivacy) {
    return this.http.post(`${this.spotifyAPI}users/${userId}/playlists`,
      {
        "name": playlistName,
        "description": playlistDescription,
        "public": playlistPrivacy
      },
      this.httpOptions)
  }

  setMusic(userId, playlistId, songs) {
    const data = songs.toString();
    return this.http.post(`${this.spotifyAPI}users/${userId}/playlists/${playlistId}/tracks?uris=${encodeURI(data)}`, {},
      this.httpOptions)
  }
}



