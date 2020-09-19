import { Component, OnInit } from '@angular/core';

import { AlertController, MenuController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services';
import { PreviousRouteService } from './services/previous-route.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent implements OnInit{
  public isAuth = false;
  public selectedIndex = 0;
  public appPages = [
    {
      title: 'inbox',
      url: '/messages',
      icon: 'albums'
    },
    {
      title: 'Outbox',
      url: '/messages/outbox',
      icon: 'paper-plane'
    },
    {
      title: 'Unread',
      url: '/messages/unread',
      icon: 'mail-unread'
    },
    // {
    //   title: 'Archived',
    //   url: '/folder/Archived',
    //   icon: 'archive'
    // },
    // {
    //   title: 'Trash',
    //   url: '/folder/Trash',
    //   icon: 'trash'
    // },
    // {
    //   title: 'Spam',
    //   url: '/folder/Spam',
    //   icon: 'warning'
    // }
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private menuCtrl: MenuController,
    private authService: AuthService
  ) {
    this.initializeApp();
    this.isAuthenticate();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  ngOnInit() {
    const path = window.location.pathname.split('messages/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
  }

  isAuthenticate() {
    this.authService.getUser().then(res => {
      if (res) {
        this.isAuth = true;
        return;
      }
    });
    this.authService.isLoggedInChanged.subscribe(res => {
      this.isAuth = res;
    });
  }
}
