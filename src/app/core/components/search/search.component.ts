import { Component, ViewChild, OnInit } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {

  @ViewChild('search')
  public search: any;

  @ViewChild('form')
  public form: any;

  public searchQuery: string;

  public artistsList = [];

  public topTracks = [];

  public selectedArtists = [];

  public user;

  public playlist = null;

  constructor(private spotifyService: SpotifyService,
    private authService: AuthService,
    public dialog: MatDialog,
    private notificationService: NotificationService) { }

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
    if (this.selectedArtists.length > 9 ) {
      this.notificationService.warning('Slow down! You add can only 10 artists by playlist.');
      return
    }

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
      if (!result) {
        return
      }
      this.spotifyService.setMusic(this.user.id, result).subscribe(
        res => {
          this.form.reset();
          this.selectedArtists = [];
          this.artistsList = [];
          this.spotifyService.selectedArtists.next(null);
          this.playlist = this.spotifyService.playlistLink;
          this.notificationService.success('Success! Go to your spotify library to find your playlist!');
        }, error => {
          this.form.reset();
          this.selectedArtists = [];
          this.artistsList = [];
          this.spotifyService.selectedArtists.next(null);
          this.notificationService.error('something went wrong!');
        },
      );
    });
  }

  removeArtist(index) {
    this.selectedArtists.splice(index);
  }

  clearLink() {
    this.playlist = null;
  }
}
