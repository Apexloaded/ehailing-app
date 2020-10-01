import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HireDetailsPage } from './hire-details.page';

const routes: Routes = [
  {
    path: '',
    component: HireDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HireDetailsPageRoutingModule {}
