import { Component, OnInit } from '@angular/core';

import { SpotifyService } from '../../services/spotify.service';
import { AuthService } from '../../services/auth.service';
import { NotificationService } from '../../services/notification.service';
import { MatDialog } from '@angular/material/dialog';

import { CreateDialogComponent } from '../search/create-dialog/create-dialog.component';

@Component({
  selector: 'app-top-artists',
  templateUrl: './top-artists.component.html',
  styleUrls: ['./top-artists.component.sass']
})
export class TopArtistsComponent implements OnInit {

  topArtists = []

  user: any;

  playlist = null;

  constructor(
    private spotifyService: SpotifyService,
    private authService: AuthService,
    public dialog: MatDialog,
    private notificationService: NotificationService
  ) { }

  ngOnInit(): void {
    this.authService.getUser().subscribe(value => {
      this.authService.user.next(value);

      this.user = value
    });

    this.spotifyService.getTopArtists().subscribe(res => {
      if (!res) return
      this.setArtists(res)
    })
  }

  setArtists(res) {
    this.topArtists = res
    this.spotifyService.selectedArtists.next(res.items)
    console.log(this.topArtists)
  }

  clearLink() {
    this.spotifyService.playlistLink.next(null)
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
          this.spotifyService.selectedArtists.next(null);
          this.notificationService.success('Success! Go to your spotify library to find your playlist!');
          this.spotifyService.playlistLink.subscribe(value => this.playlist = value)
        }, error => {
          this.spotifyService.selectedArtists.next(null);
          this.notificationService.error('something went wrong!');
        },
      );
    });
  }

}
