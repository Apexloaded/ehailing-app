import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListBookingPage } from './list-booking.page';

const routes: Routes = [
  {
    path: '',
    component: ListBookingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListBookingPageRoutingModule {}
