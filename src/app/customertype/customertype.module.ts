import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { CustomertypePageRoutingModule } from './customertype-routing.module';

import { CustomertypePage } from './customertype.page';

const routes: Routes = [
  {
    path: '',
    component: CustomertypePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes),
    CustomertypePageRoutingModule
  ],
  declarations: [CustomertypePage]
})
export class CustomertypePageModule {}
