import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CorporatecardsPage } from './corporatecards.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: CorporatecardsPage,
    children: [
      {
        path: 'spocprofile',
        children: [
          {
            path: '',
            loadChildren: () => import('./spocprofile/spocprofile.module').then(m => m.SpocprofilePageModule)
          },
          {
            path: 'ordinarycorporate',
            loadChildren: () => import('./spocprofile/corporateuser/corporateuser.module').then(m => m.CorporateuserPageModule)
          },
          {
            path: 'customcorporate',
            loadChildren: () => import('./spocprofile/customcorporate/customcorporate.module').then(m => m.CustomcorporatePageModule)
          },
          {
            path: 'edit/:userId',
            loadChildren: () => import('./spocprofile/edit-corporateuser/edit-corporateuser.module').then(m => m.EditCorporateuserPageModule)
          }
        ]
      },
      {
        path: 'employeescards',
        children: [
          {
            path: '',
            loadChildren: () => import('./employeescards/employeescards.module').then(m => m.EmployeescardsPageModule)
          }
        ]
      },
      {
        path: 'editrequests',
        children: [
          {
            path: '',
            loadChildren: () => import('./editrequests/editrequests.module').then(m => m.EditrequestsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: './employeescards/employeescards.module',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/corporatecards/tabs/spocprofile',
    pathMatch: 'full'
  },
  {
    path: 'corporateuser',
    loadChildren: () => import('./spocprofile/corporateuser/corporateuser.module').then( m => m.CorporateuserPageModule)
  },
  {
    path: 'customcorporate',
    loadChildren: () => import('./spocprofile/customcorporate/customcorporate.module').then( m => m.CustomcorporatePageModule)
  },
  {
    path: 'edit-corporateuser',
    loadChildren: () => import('./spocprofile/edit-corporateuser/edit-corporateuser.module').then( m => m.EditCorporateuserPageModule)
  }
  // ,
  // {
  //   path: 'custom',
  //   loadChildren: () => import('./spocprofile/customcorporate/customcorporate.module').then( m => m.CustomuserPageModule)
  // }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CorporatecardsPageRoutingModule {}
