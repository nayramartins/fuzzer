import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RoutingModule } from './routing.module';

import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/services/auth.guard';
import { SpotifyService } from './core/services/spotify.service';

import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { SearchComponent } from './core/components/search/search.component';
import { AboutComponent } from './core/components/about/about.component';

import {
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';

import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { MatDialogModule, MatRadioModule } from '@angular/material';
import { CreateDialogComponent } from './core/components/search/create-dialog/create-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    AboutComponent,
    CreateDialogComponent
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
    MatRadioModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    SpotifyService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateDialogComponent
  ],
})
export class AppModule { }
