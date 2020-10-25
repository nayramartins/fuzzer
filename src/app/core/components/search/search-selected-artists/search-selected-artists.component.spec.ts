import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSelectedArtistsComponent } from './search-selected-artists.component';

describe('SearchSelectedArtistsComponent', () => {
  let component: SearchSelectedArtistsComponent;
  let fixture: ComponentFixture<SearchSelectedArtistsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchSelectedArtistsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchSelectedArtistsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
