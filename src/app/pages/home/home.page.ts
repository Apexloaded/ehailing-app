import { Component, OnInit } from '@angular/core';
import {Customer} from "../../models";
import {AuthService} from "../../services";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  private user: Customer;
  private isLoading: boolean;

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
