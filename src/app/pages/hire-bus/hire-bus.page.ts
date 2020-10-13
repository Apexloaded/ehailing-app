import { Component, OnInit } from '@angular/core';
import {PmtHiring} from '../../providers';
import {Customer} from '../../models';
import {StorageService} from '../../services';

@Component({
  selector: 'app-hire-bus',
  templateUrl: './hire-bus.page.html',
  styleUrls: ['./hire-bus.page.scss'],
})
export class HireBusPage implements OnInit {
  public user: Customer;
  public userHiring: Array<any> = [];
  public isLoading: boolean;

  public error = {
    isError: null,
    icon: null,
    title: null,
    message: null
  };

  constructor(
      private pmtHiring: PmtHiring
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.user = StorageService.getItem('user');
    this.getHirings(this.user);
  }

  getHirings(customer: Customer) {
    this.pmtHiring.recordRetrieve(`?customer=${customer.id}`)
        .then(response => {
          this.isLoading = false;
          if (response.success) {
            this.userHiring = response.payload;
          }
        }).catch(error => {
          this.isLoading = false;
          this.error.isError = true;
          this.error.icon = 'alert-outline';
          this.error.title = 'An Error Occurred!';
          this.error.message = 'We couldn\'t retrieve your records, please pull down to try again.';
        });
  }

  doRefresh(ev) {
    this.isLoading = true;
    setTimeout(() => {
      this.getHirings(this.user);
      ev.target.complete();
    }, 2000);
  }

}
