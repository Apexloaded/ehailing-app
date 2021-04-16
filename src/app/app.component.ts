import { Component, OnInit } from '@angular/core';

import { AlertController, Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services';
import { Location } from '@angular/common';

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
    }
  ];

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private _location: Location
  ) {
    this.initializeApp();
    this.isAuthenticate();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    this.platform.backButton.subscribeWithPriority(10, (processNextHandler) => {
      if (this._location.isCurrentPathEqualTo('/app/home')) {
        this.showExitConfirm();
        processNextHandler();
      } else {
        this._location.back();
      }
    });

    this.platform.backButton.subscribeWithPriority(5, () => {
      this.alertCtrl.getTop().then(r => {
        if (r) {
          navigator['app'].exitApp();
        }
      }).catch(e => {
        console.log(e);
      })
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

  showExitConfirm() {
    this.alertCtrl.create({
      header: 'Terminate App',
      message: 'Do you want to close the app?',
      backdropDismiss: false,
      buttons: [{
        text: 'Stay',
        role: 'cancel',
        handler: () => {
          console.log('Application exit prevented!');
        }
      }, {
        text: 'Exit',
        handler: () => {
          navigator['app'].exitApp();
        }
      }]
    }).then(alert => {
        alert.present();
    });
  }
}
