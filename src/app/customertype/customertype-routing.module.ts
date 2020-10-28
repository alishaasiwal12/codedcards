import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomertypePage } from './customertype.page';

const routes: Routes = [
  {
    path: '',
    component: CustomertypePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CustomertypePageRoutingModule {}
