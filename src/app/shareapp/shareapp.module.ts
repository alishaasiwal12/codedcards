import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareappPageRoutingModule } from './shareapp-routing.module';

import { ShareappPage } from './shareapp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareappPageRoutingModule
  ],
  declarations: [ShareappPage]
})
export class ShareappPageModule {}
