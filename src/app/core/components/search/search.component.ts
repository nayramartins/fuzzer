import { Component, ViewChild, OnInit } from '@angular/core';

import { SpotifyService } from '../../services/spotify.service';
import { AuthService } from '../../services/auth.service';
import { ViewStateService } from '../../services/view-state.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent implements OnInit {
  @ViewChild('search', { static: false })
  public search: any;

  @ViewChild('form', { static: false })
  public form: any;

  searchQuery: string;

  playlist = null;

  constructor(
    private spotifyService: SpotifyService,
    private authService: AuthService,
    private viewStateService: ViewStateService,
  ) { }

  ngOnInit() {
    this.authService.getUser().subscribe(value => {
      this.authService.user.next(value);
    });

    this.spotifyService.playlistLink.subscribe(value => this.playlist = value)
  };

  searchArtist() {
    if (!this.search.value) return

    this.spotifyService.searchArtist(this.searchQuery).subscribe(res => {
      this.viewStateService.searchResult.next(res)
    });
  }

  clearLink() {
    this.spotifyService.playlistLink.next(null)
  }
}
