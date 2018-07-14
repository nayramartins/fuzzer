import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RoutingModule } from './routing.module';

import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/services/auth.guard';

import { CookieModule } from 'ngx-cookie';

import { AppComponent } from './app.component';
import { LoginComponent } from './core/components/login/login.component';
import { SearchComponent } from './core/components/search/search.component';
import { AboutComponent } from './core/components/about/about.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SearchComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    CookieModule.forRoot()
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
