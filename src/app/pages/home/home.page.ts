import { Component, OnInit } from '@angular/core';
import {Customer} from "../../models";
import {AuthService} from "../../services";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  public user: Customer;
  public isLoading: boolean;
  public appMenus = [
    {
      name: 'Booking',
      route: 'book',
      icon: 'book-a-seat.png'
    },
    {
      name: 'History',
      route: 'list-booking',
      icon: 'travel-history.png'
    },
    {
      name: 'Hire',
      route: 'hire-bus',
      icon: 'hire-bus.png'
    },
    {
      name: 'Pickup',
      route: 'pickup',
      icon: 'pick-me-up.png'
    },
    {
      name: 'Message',
      route: 'messages',
      icon: 'msg.png'
    },
    {
      name: 'Ticket',
      route: 'tickets',
      icon: 'tickets.png'
    },
    {
      name: 'Profile',
      route: 'profile',
      icon: 'profile.png'
    }
  ];

  constructor(
      private authService: AuthService
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.authService.getUser().then(res => {
      this.user = res;
      this.isLoading = false;
    });
  }

}
