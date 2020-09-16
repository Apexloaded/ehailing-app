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
  UserService, UtilitiesService, StorageService
} from './services';
import {Terminals, States, Schedules, PmtReservations, PmtMail, PmtTickets} from './providers';
import {PmlRouting} from "./models";

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
    UserService,
    UtilitiesService,
    StorageService,
    States,
    PmtReservations,
    PmtMail,
    Terminals,
    Schedules,
    PmtTickets,
    PreviousRouteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
