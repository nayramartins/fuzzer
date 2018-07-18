import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  @ViewChild('search')
  public search: any;

  public searchQuery: string;

  public artistsList = [];

  public topTracks = [];

  public selectedArtists = [];

  public playlistInfo;

  public user;

  constructor(private spotifyService: SpotifyService,
    private authService: AuthService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.authService.getUser().subscribe(value => {
      this.user = value;
    });
  };

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
    this.selectedArtists.push(artist);
    this.spotifyService.selectedArtists.next(this.selectedArtists);
  }

  openDialog(): void {
    let dialogRef = this.dialog.open(CreateDialogComponent, {
      width: '960px',
      data: {
        editionMode: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      this.getPlaylistId();
      this.spotifyService.setMusic(this.user.id, this.playlistInfo.id, result).subscribe();
    });
  }

  getPlaylistId() {
    this.spotifyService.playlistId.subscribe(value => {
      this.playlistInfo = value;
    });
  }

  removeArtist(index) {
    this.selectedArtists.splice(index);
  }
}
