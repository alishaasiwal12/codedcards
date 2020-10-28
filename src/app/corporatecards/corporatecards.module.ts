import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CorporatecardsPageRoutingModule } from './corporatecards-routing.module';

import { CorporatecardsPage } from './corporatecards.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CorporatecardsPageRoutingModule
  ],
  declarations: [CorporatecardsPage]
})
export class CorporatecardsPageModule {}
