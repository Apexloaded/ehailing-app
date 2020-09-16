import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditPageRoutingModule } from './edit-routing.module';

import { EditPage } from './edit.page';
import {EditProfileComponent} from "../../../components/edit-profile/edit-profile.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    IonicModule,
    EditPageRoutingModule
  ],
  declarations: [EditPage, EditProfileComponent]
})
export class EditPageModule {}
