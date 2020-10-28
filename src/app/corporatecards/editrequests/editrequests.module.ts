import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditrequestsPageRoutingModule } from './editrequests-routing.module';

import { EditrequestsPage } from './editrequests.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditrequestsPageRoutingModule
  ],
  declarations: [EditrequestsPage]
})
export class EditrequestsPageModule {}
