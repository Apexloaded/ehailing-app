import { Component, OnInit } from '@angular/core';
import {SupportService} from '../../services/support.service';
import {AuthService} from '../../services';
import {Mail} from '../../models/mail';

@Component({
  selector: 'app-outbox-component',
  templateUrl: './outbox.component.html',
  styleUrls: ['./outbox.component.scss'],
})
export class OutboxComponent implements OnInit {
  public outbox: Array<Mail> = [];
  public isLoading: boolean;

  public error = {
    isError: null,
    icon: null,
    title: null,
    message: null
  };

  constructor(
      private supportService: SupportService,
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.getSentMail();
  }

  getSentMail() {
    this.authService.getUser().then(user => {
      this.supportService.getOutBox(user.id).then(outbox => {
        this.outbox = outbox.payload;
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
      this.getSentMail();
      ev.target.complete();
    }, 2000);
  }
}
