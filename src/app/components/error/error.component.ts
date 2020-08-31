import { Component, OnInit, Input } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  @Input() icon: string;
  @Input() msg: string;
  @Input() title: string;
  @Input() redirectUrl?: string;

  constructor(
      private router: Router
  ) { }

  ngOnInit() {}

  redirect(url) {
    this.router.navigateByUrl(`${url}`);
  }

}
