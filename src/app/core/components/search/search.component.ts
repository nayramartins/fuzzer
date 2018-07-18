import { Component, ViewChild, ElementRef } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {

  @ViewChild('search')
  public search: any;

  searchQuery: string;

  artistsList = [];

  topTracks = [];

  selectedArtists = [];

  userInfo;

  playlistInfo;

  constructor(private spotifyService: SpotifyService) {
    this.getUserId();
   }

  searchArtist() {
    if (!this.search.value == undefined) {
      return
    }

    this.spotifyService.searchArtist(this.searchQuery).subscribe(res => {
      this.setArtists(res);
    });
  }

  setArtists(res) {
    this.artistsList = res.artists.items;
  }

  selectArtist(artist: any) {
    this.selectedArtists.push(artist.name);
    this.spotifyService.getTopSongs(artist.id).subscribe(res => {
      this.setPlaylistSongs(res);
    });
  }

  setPlaylistSongs(res) {
    res.tracks.filter(song => {
      this.topTracks.push(song.uri);
    });
  }

  getUserId() {
    this.spotifyService.getUserId().subscribe(value => {
      this.userInfo = value;
    })
  }

  createPlaylist() {
    this.spotifyService.createMagicPlaylist(this.userInfo.id).subscribe(value => {
      this.playlistInfo = value;
      this.spotifyService.setMusic(this.userInfo.id, this.playlistInfo.id, this.topTracks).subscribe();
    });
  }

  removeArtist(index) {
    this.selectedArtists.splice(index);
  }
}
