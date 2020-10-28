import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { FileSizeFormatPipe } from './file-size-format.pipe';
import { SharedModule } from '../../../shared/shared.module';

import { CustomcorporatePage } from './customcorporate.page';

const routes: Routes = [
  {
    path: '',
    component: CustomcorporatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [CustomcorporatePage, FileSizeFormatPipe]
})
export class CustomcorporatePageModule {}
