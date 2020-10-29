import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ViewStateService } from '../../services/view-state.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private viewStateService: ViewStateService,
  ) { }

  ngOnInit(): void {
  }

  setSelectedMode(mode: string) {
    this.viewStateService.searchMode = mode
    if (mode === 'FREEDOM') {
      this.router.navigate(['/search'])
    }

    if (mode === 'HELP') {
      this.router.navigate(['/top-artists'])
    }
  }

}
