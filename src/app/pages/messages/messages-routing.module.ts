import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessagesPage } from './messages.page';

const routes: Routes = [
  {
    path: '',
    component: MessagesPage
  },
  {
    path: 'outbox',
    loadChildren: () => import('./outbox/outbox.module').then( m => m.OutboxPageModule)
  },
  {
    path: 'unread',
    loadChildren: () => import('./unread/unread.module').then( m => m.UnreadPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessagesPageRoutingModule {}
