import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../services/notification.service';
import { SpotifyService } from '../../../services/spotify.service';
import { ViewStateService } from '../../../services/view-state.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.sass']
})
export class SearchResultComponent implements OnInit {

  searchResults = null

  selectedArtists = []

  buttonLabel = 'ADD'

  constructor(
    private viewStateService: ViewStateService,
    private spotifyService: SpotifyService,
    private notificationService: NotificationService,
  ) { }

  ngOnInit(): void {
    this.viewStateService.searchResult.subscribe(value => {
      if (!value) return this.searchResults = []
      this.searchResults = value.artists.items
    })
  }

  selectArtist (artist: any) {
    this.selectedArtists.push(artist)
    this.spotifyService.selectedArtists.next(this.selectedArtists)
    this.notificationService.success(`${artist.name} added to the line-up!`)
  }
}
