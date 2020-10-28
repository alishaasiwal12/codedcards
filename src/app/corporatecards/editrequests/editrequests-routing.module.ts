import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditrequestsPage } from './editrequests.page';

const routes: Routes = [
  {
    path: '',
    component: EditrequestsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditrequestsPageRoutingModule {}
