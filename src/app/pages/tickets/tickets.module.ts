import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TicketsPageRoutingModule } from './tickets-routing.module';
import { TicketsPage } from './tickets.page';
import { CreateTicketComponent } from '../../components/create-ticket/create-ticket.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    TicketsPageRoutingModule
  ],
  declarations: [TicketsPage, CreateTicketComponent]
})
export class TicketsPageModule {}
