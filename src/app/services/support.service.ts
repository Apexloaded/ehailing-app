import { Injectable } from '@angular/core';
import { PmtMail } from '../providers/mail';
import { EnvService } from './env.service';
import { Mail } from '../models/mail';
import { StorageService } from './storage.services';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  public inbox: Mail[];
  public outbox: Mail[];

  constructor(
      private mailProvider: PmtMail,
      private envService: EnvService,
  ) {
    const user = StorageService.getItem('user');
    const inboxQuery = `?recipientId=${user.id}&sender=STAFF&box=INBOX&sort=-createdAt`;
    const outBoxQuery = `?senderId=${user.id}&sender=CUSTOMER&box=OUTBOX&sort=-createdAt`;

    this.mailProvider.recordRetrieve(inboxQuery)
      .then(res => {
        if (!res.success) {
          return;
        }
        this.inbox = res.payload;
      });

    this.mailProvider.recordRetrieve(outBoxQuery).then(res => {
      if (!res.success) {
        return;
      }
      this.outbox = res.payload;
    });
  }

  sendMail(data) {
    const query = `?apiKey=${this.envService.apiKey}`;
    return this.mailProvider.recordCreate(data, query);
  }

  getOutBox(senderId) {
    const query = `?senderId=${senderId}&sender=CUSTOMER&box=OUTBOX&sort=-createdAt`;
    return this.mailProvider.recordRetrieve(query);
  }

  getSingleMailById(mailId) {
    const query = `?_id=${mailId}`;
    return this.mailProvider.recordRetrieve(query);
  }

  getUnreadMail(recipientId: string) {
    const query = `?recipientId=${recipientId}&sender=STAFF&box=INBOX&receiveStatus=UNREAD`;
    return this.mailProvider.recordRetrieve(query);
  }

  updateReadMail(mail) {
    const data = {receiveStatus: 'READ'};
    return this.mailProvider.recordUpdate(mail, data);
  }
}
