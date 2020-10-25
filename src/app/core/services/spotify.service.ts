
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject ,  Observable } from 'rxjs';
import { AuthService } from './auth.service';


@Injectable()
export class SpotifyService {

  selectedArtists = new BehaviorSubject<any[]>([]);

  selectedSongs = new BehaviorSubject<any>(null);

  httpOptions = this.authService.httpOptions;

  spotifyAPI = 'https://api.spotify.com/v1/';

  playlistLink = new BehaviorSubject<any>(null);

  constructor(private cookieService: CookieService,
    private http: HttpClient,
    private authService: AuthService) {
  }

  searchArtist(query) {
    return this.http.get(`${this.spotifyAPI}search?q=${query}&type=artist&limit=10&offset=0`,
      this.httpOptions);
  }

  getTopSongs(id) {
    return this.http.get(`${this.spotifyAPI}artists/${id}/top-tracks?country=US`,
      this.httpOptions);
  }

  createMagicPlaylist(userId, playlistName, playlistDescription, playlistPrivacy): Observable<any> {
    return this.http.post(`${this.spotifyAPI}users/${userId}/playlists`,
      {
        "name": playlistName,
        "description": playlistDescription,
        "public": playlistPrivacy
      },
      this.httpOptions)
  }

  setMusic(userId, playListInfo) {
    const {songsURI, playlistId} = playListInfo
    const data = songsURI.toString();
    return this.http.post(`${this.spotifyAPI}users/${userId}/playlists/${playlistId}/tracks?uris=${encodeURI(data)}`, {},
      this.httpOptions)
  }
}



