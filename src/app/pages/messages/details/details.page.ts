import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SupportService} from '../../../services/support.service';
import {Mail} from '../../../models/mail';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  public mail: Mail;
  public error = {
    isError: null,
    icon: null,
    title: null,
    message: null
  };
  public isLoading: boolean;

  constructor(
      private activatedRoute: ActivatedRoute,
      private supportService: SupportService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.activatedRoute.paramMap.subscribe(res => {
      if (!res.has('id')) {
        return;
      }
      const mailId = res.get('id');
      this.getMailByID(mailId);
    });
  }

  getMailByID(mailId: string) {
    this.supportService.getSingleMailById(mailId).then(res => {
      this.mail = res.payload[0];
      this.isLoading = false;
      if (this.mail.box === 'INBOX') {
          switch (this.mail.receiveStatus) {
              case 'UNREAD':
                  this.updateRead(this.mail);
                  break;
          }
      }
    }).catch(err => {
      this.isLoading = false;
      this.error.isError = true;
      this.error.icon = 'alert-outline';
      this.error.title = 'An Error Occurred!';
      this.error.message = 'We couldn\'t retrieve your mail record.';
    });
  }

  updateRead(mail) {
      this.supportService.updateReadMail(mail)
          .then(res => {
              console.log(res);
          })
          .catch(err => {
              console.log(err);
          });
  }

    doRefresh(ev) {
        this.isLoading = true;
        setTimeout(() => {
            this.activatedRoute.paramMap.subscribe(res => {
                if (!res.has('id')) {
                    return;
                }
                const mailId = res.get('id');
                this.getMailByID(mailId);
            });
            ev.target.complete();
        }, 2000);
    }

}
