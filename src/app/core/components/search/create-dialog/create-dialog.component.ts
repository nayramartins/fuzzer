import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SpotifyService } from '../../../services/spotify.service';
import { AuthService } from '../../../services/auth.service';
import { Playlist } from '../../../models/Playlist';


@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.sass']
})
export class CreateDialogComponent implements OnInit {

  selectedArtists;

  topTracks = [];

  songsURI = [];

  user;

  playlist: Playlist = {
    name: '',
    description: '',
    public: false
  }

  constructor(
    private dialogRef: MatDialogRef<CreateDialogComponent>,
    private spotifyService: SpotifyService,
    private authService: AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
    this.spotifyService.selectedArtists.subscribe(value => {
      this.selectedArtists = value;
    });

    this.selectedArtists.map(value => {
      this.spotifyService.getTopSongs(value.id).subscribe(res => {
        this.topTracks.push(res);
      });
    });

    this.authService.getUser().subscribe(value => {
      this.user = value;
    });
  }

  getSongsURI() {
    this.topTracks.map(tracks => {
      tracks.tracks.map(track => {
      this.songsURI.push(track.uri);
      this.spotifyService.selectedSongs.next(this.songsURI);
      })
    });
  }

  close(): void {
    this.spotifyService.createMagicPlaylist(this.user.id, this.playlist.name,
      this.playlist.description, this.playlist.public).subscribe(playlist => {
        this.spotifyService.playlistLink = playlist;
        this.getSongsURI()
        this.dialogRef.close({songsURI: this.songsURI, playlistId: playlist.id});
      });
  }

}
