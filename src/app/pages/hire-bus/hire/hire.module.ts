import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HirePageRoutingModule } from './hire-routing.module';

import { HirePage } from './hire.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    HirePageRoutingModule
  ],
  declarations: [HirePage]
})
export class HirePageModule {}
