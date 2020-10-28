import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareappPage } from './shareapp.page';

const routes: Routes = [
  {
    path: '',
    component: ShareappPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareappPageRoutingModule {}
