import { Component, OnInit } from '@angular/core';

import { NotificationService } from '../../../services/notification.service';
import { ViewStateService } from '../../../services/view-state.service';

import { MatDialog } from '@angular/material/dialog';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { SpotifyService } from '../../../services/spotify.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-search-selected-artists',
  templateUrl: './search-selected-artists.component.html',
  styleUrls: ['./search-selected-artists.component.sass']
})
export class SearchSelectedArtistsComponent implements OnInit {

  selectedArtists = []

  user: any;

  constructor(
    private viewStateService: ViewStateService,
    public dialog: MatDialog,
    private notificationService: NotificationService,
    private spotifyService: SpotifyService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.spotifyService.selectedArtists.subscribe(value => {
      this.selectedArtists = value
    })

    this.authService.user.subscribe(value => this.user = value)
  }

  removeArtist(index: number, artist: any) {
    this.selectedArtists.splice(index, 1);
    this.spotifyService.selectedArtists.next(this.selectedArtists)
    this.notificationService.warning(`${artist.name} was cancelled!`)
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
          this.selectedArtists = [];
          this.viewStateService.searchResult.next(null)
          this.spotifyService.selectedArtists.next(null);
          this.notificationService.success('Success! Go to your spotify library to find your playlist!');
        }, error => {
          this.selectedArtists = [];
          this.viewStateService.searchResult.next(null)
          this.spotifyService.selectedArtists.next(null);
          this.notificationService.error('something went wrong!');
        },
      );
    });
  }
}
