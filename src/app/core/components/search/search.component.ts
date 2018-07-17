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

  constructor(private spotifyService: SpotifyService) { }

  searchArtist() {
    if (!this.search.value == undefined) {
      return
    }

    this.spotifyService.searchArtist(this.searchQuery).subscribe(res => {
      this.setArtists(res);
    });
  }

  setArtists(res: any) {
    this.artistsList = res.artists.items;
  }

  selectArtist(artist: any) {
    this.selectedArtists.push(artist.name);
    this.spotifyService.getTopSongs(artist.id).subscribe(song => {
      this.setPlaylistSongs(song);
    });
  }

  setPlaylistSongs(song) {
    song.tracks.filter(song => {
      this.topTracks.push(song.uri);
    });


    this.createPlaylist();
  }

  getUserId() {
    this.spotifyService.getUserId().subscribe(value => {
      this.userInfo = value;
    })
  }

  createPlaylist() {
    this.spotifyService.createMagicPlaylist(this.userInfo);
  }

  removeArtist(index) {
    this.selectedArtists.splice(index);
  }
}
