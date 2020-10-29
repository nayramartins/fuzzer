import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './routing.module';

import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/services/auth.guard';
import { SpotifyService } from './core/services/spotify.service';
import { NotificationService } from './core/services/notification.service';

import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { SearchComponent } from './core/components/search/search.component';
import { AboutComponent } from './core/components/about/about.component';

import { HeaderComponent } from './core/components/shared/header/header.component';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { CreateDialogComponent } from './core/components/search/create-dialog/create-dialog.component';
import { SearchResultComponent } from './core/components/search/search-result/search-result.component';
import { SearchSelectedArtistsComponent } from './core/components/search/search-selected-artists/search-selected-artists.component';
import { HomeComponent } from './core/components/home/home.component';
import { TopArtistsComponent } from './core/components/top-artists/top-artists.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    AboutComponent,
    CreateDialogComponent,
    HeaderComponent,
    SearchResultComponent,
    SearchSelectedArtistsComponent,
    HomeComponent,
    TopArtistsComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RoutingModule,
    CookieModule.forRoot(),
    ReactiveFormsModule,
    FormsModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatRadioModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    SpotifyService,
    NotificationService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateDialogComponent
  ],
})
export class AppModule { }
