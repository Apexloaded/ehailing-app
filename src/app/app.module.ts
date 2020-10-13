import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PreviousRouteService } from './services/previous-route.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';
import {
  AuthService,
  EnvService,
  ApiService,
  ErrorInterceptor,
  SupportService,
  TicketsService,
  UtilitiesService, StorageService, LocationService, GoogleMapService
} from './services';
import {
  Terminals,
  States,
  Schedules,
  PmtReservations,
  PmtMail,
  PmtTickets,
  PmtPickups,
  PmtHiring
} from './providers';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
      BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    AuthService,
    EnvService,
    ApiService,
    SupportService,
    TicketsService,
    UtilitiesService,
    StorageService,
    States,
    PmtReservations,
    PmtMail,
    Terminals,
    Schedules,
    PmtTickets,
    PmtPickups,
    PmtHiring,
    LocationService,
    PreviousRouteService,
    GoogleMapService,
    Geolocation,
    NativeGeocoder
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
