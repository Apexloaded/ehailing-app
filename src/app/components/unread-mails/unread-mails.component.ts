import { Component, OnInit } from '@angular/core';
import {Mail} from '../../models/mail';
import {AuthService} from '../../services';
import {SupportService} from '../../services/support.service';

@Component({
  selector: 'app-unread-mails',
  templateUrl: './unread-mails.component.html',
  styleUrls: ['./unread-mails.component.scss'],
})
export class UnreadMailsComponent implements OnInit {
  public unread: Array<Mail> = [];
  public isLoading: boolean;

  public error = {
    isError: null,
    icon: null,
    title: null,
    message: null
  };

  constructor(
      private authService: AuthService,
      private supportService: SupportService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getUnreadMail();
  }

  getUnreadMail() {
    this.authService.getUser().then(user => {
      this.supportService.getUnreadMail(user.id).then(unread => {
        this.unread = unread.payload;
        this.isLoading = false;
      }).catch(err => {
        this.isLoading = false;
        this.error.isError = true;
        this.error.icon = 'alert-outline';
        this.error.title = 'An Error Occurred!';
        this.error.message = 'We couldn\'t retrieve your email records.';
      });
    });
  }

  doRefresh(ev) {
    setTimeout(() => {
      this.getUnreadMail();
      ev.target.complete();
    }, 2000);
  }

}
