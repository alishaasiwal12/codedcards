import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SavedcardsPage } from './savedcards.page';
 
const routes: Routes = [
  {
    path: 'tabs',
    component: SavedcardsPage,
    children: [
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
          },
          {
            path: 'ordinary',
            loadChildren: () => import('./profile/userdetails/userdetails.module').then(m => m.UserdetailsPageModule)
          },
          {
            path: 'custom',
            loadChildren: () => import('./profile/customuser/customuser.module').then(m => m.CustomuserPageModule)
          },
          {
            path: 'design',
            loadChildren: () => import('./profile/designcard/designcard.module').then(m => m.DesigncardPageModule)
          },
          {
            path: 'edit/:userId',
            loadChildren: () => import('./profile/edit-user/edit-user.module').then(m => m.EditUserPageModule)
          },
          {
            path: 'editcorporate/:userId',
            loadChildren: () => import('./profile/edit-corporate/edit-corporate.module').then(m => m.EditCorporatePageModule)
          }
        ]
      },
      {
        path: 'mycards',
        children: [
          {
            path: '',
            loadChildren: () => import('./mycards/mycards.module').then(m => m.MycardsPageModule)
          }
        ]
      },
      {
        path: 'sharedcards',
        children: [
          {
            path: '',
            loadChildren: () => import('./sharedcards/sharedcards.module').then(m => m.SharedcardsPageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/savedcards/tabs/mycards',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/savedcards/tabs/mycards',
    pathMatch: 'full'
  },
  {
    path: 'edit-corporate',
    loadChildren: () => import('./profile/edit-corporate/edit-corporate.module').then( m => m.EditCorporatePageModule)
  },
  {
    path: 'designcard',
    loadChildren: () => import('./profile/designcard/designcard.module').then( m => m.DesigncardPageModule)
  }
  // ,
  // {
  //   path: 'customuser',
  //   loadChildren: () => import('./profile/customuser/customuser.module').then( m => m.CustomuserPageModule)
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SavedcardsPageRoutingModule {}