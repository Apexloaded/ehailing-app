import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UnreadPage } from './unread.page';

const routes: Routes = [
  {
    path: '',
    component: UnreadPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UnreadPageRoutingModule {}
