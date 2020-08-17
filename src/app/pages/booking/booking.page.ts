import { Component, OnInit } from '@angular/core';
import { PreviousRouteService } from 'src/app/services/previous-route.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.page.html',
  styleUrls: ['./booking.page.scss'],
})
export class BookingPage implements OnInit {
  public previousRoute: string;
  public bookForm: FormGroup;
  public isLoading: boolean;

  constructor(
    private prevRoute: PreviousRouteService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.buildForm();
  }

  buildForm() {
    this.bookForm = this.fb.group({
      surname: new FormControl(null, {
        updateOn: 'change',
        validators: [Validators.required]
      }),
      otherName: new FormControl(null, {
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

}
