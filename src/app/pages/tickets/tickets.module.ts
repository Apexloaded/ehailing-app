import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TicketsPageRoutingModule } from './tickets-routing.module';
import { TicketsPage } from './tickets.page';
import { CreateTicketComponent } from '../../components/create-ticket/create-ticket.component';
import { SharedModule} from '../../modules/shared/shared.module';
import { TicketsDetailsComponent} from '../../components/tickets-details/tickets-details.component';
import { ReplyTicketComponent } from '../../components/reply-ticket/reply-ticket.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TicketsPageRoutingModule,
    SharedModule
  ],
  declarations: [TicketsPage, CreateTicketComponent, TicketsDetailsComponent, ReplyTicketComponent]
})
export class TicketsPageModule {}
