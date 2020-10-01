import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HireBusPage } from './hire-bus.page';

const routes: Routes = [
  {
    path: '',
    component: HireBusPage
  },
  {
    path: 'hire',
    loadChildren: () => import('./hire/hire.module').then( m => m.HirePageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HireBusPageRoutingModule {}
