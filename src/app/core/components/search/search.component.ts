import { Component } from '@angular/core';
import { SpotifyService } from '../../services/spotify.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.sass']
})
export class SearchComponent {
  searchQuery: string;
  constructor(private spotifySerice: SpotifyService) { }

  searchArtist() {
    this.spotifySerice.searchArtist(this.searchQuery).subscribe(res => {
      console.log(res)
    });
  }
}
