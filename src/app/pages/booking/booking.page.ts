import { Component, OnInit } from '@angular/core';
import { PreviousRouteService } from 'src/app/services/previous-route.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import {Schedules, Terminals} from '../../providers';
import { Terminal } from 'src/app/models';
import { UtilitiesService } from 'src/app/services/utilities.service';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  public previousRoute: string;
  public bookForm: FormGroup;
  public isLoading: boolean;
  public terminalFrom: Array<Terminal>;
  public terminalTo: Array<Terminal>;
  public isTerminalLoading: boolean;

  public event = {
    startDate: new Date( new Date().getTime() + 1000 * 60 * 60 * 24).toISOString(),
    endDate: new Date( new Date().getTime() + 1000 * 60 * 60 * 24 * 3).toISOString()
  };

  constructor(
    private prevRoute: PreviousRouteService,
    private fb: FormBuilder,
    private utilitiesService: UtilitiesService,
    private pmtTerminals: Terminals,
    private pmtSchedules: Schedules
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.isTerminalLoading = true;
    this.getTerminals();
    this.buildForm();
  }

  buildForm() {
    this.bookForm = this.fb.group({
      terminalFrom: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      terminalTo: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      departureDate: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      })
    });
    this.isLoading = false;
    return;
  }


  ionViewWillEnter() {
    this.previousRoute = this.prevRoute.getPreviousRoute;
    if (this.previousRoute !== null && !this.previousRoute.includes('/book')) {
      return;
    }
    this.previousRoute = '/home';
  }

  getTerminals() {
    const terminalsArr = this.pmtTerminals.query() || [];
    if (terminalsArr.length > 0) {
      this.terminalFrom = terminalsArr;
      this.isTerminalLoading = false;
      return;
    }

    this.pmtTerminals.recordRetrieve('?sort=name').then(
        res => {
          this.terminalFrom = res.payload;
          this.isTerminalLoading = false;
        }
    ).catch(err => {
      this.isTerminalLoading = false;
      this.terminalFrom = [];
      this.utilitiesService.presentToast('We couldn\'t process your request', 3000);
      return;
    });
  }

  onSelectTerminalFrom(ev) {
    this.terminalTo = this.terminalFrom.filter(f => f.name !== ev.detail.value);
  }

  searchReservation() {
    if (!this.bookForm.valid) {
      this.utilitiesService.presentToast('Please enter all details', 3000);
      return;
    }

    const bDate = this.bookForm.controls.departureDate.value.split('T');
    const data = {
      terminalTo: this.bookForm.controls.terminalTo.value,
      terminalFrom: this.bookForm.controls.terminalFrom.value,
      boardingDate: bDate[0]
    };

    console.log(data);
    this.pmtSchedules.recordRetrieve(`/reservation?boardingDate=${data.boardingDate}&pmtTerminalFrom=${data.terminalFrom}&pmtTerminalTo=${data.terminalTo}`)
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
  }

}
