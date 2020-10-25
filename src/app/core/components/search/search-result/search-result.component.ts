import { Component, OnInit } from '@angular/core';
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

  constructor(
    private viewStateService: ViewStateService,
    private spotifyService: SpotifyService,
  ) { }

  ngOnInit(): void {
    this.viewStateService.searchResult.subscribe(value => {
      if (!value) return this.searchResults = []
      this.searchResults = value.artists.items
    })
  }

  selectArtist (artist) {
    this.selectedArtists.push(artist)
    this.spotifyService.selectedArtists.next(this.selectedArtists)
  }
}
