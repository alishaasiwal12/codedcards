import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'shareapp',
    loadChildren: () => import('./shareapp/shareapp.module').then( m => m.ShareappPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'query',
    loadChildren: () => import('./query/query.module').then( m => m.QueryPageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'savedcards',
    loadChildren: () => import('./savedcards/savedcards.module').then( m => m.SavedcardsPageModule)
  },
  {
    path: 'privacypolicy',
    loadChildren: () => import('./privacypolicy/privacypolicy.module').then( m => m.PrivacypolicyPageModule)
  },
  {
    path: 'showinstructions',
    loadChildren: () => import('./showinstructions/showinstructions.module').then( m => m.ShowinstructionsPageModule)
  },
  {
    path: 'rateapp',
    loadChildren: () => import('./rateapp/rateapp.module').then( m => m.RateappPageModule)
    // , canLoad: [AuthGuard]
  },
  {
    path: 'customertype',
    loadChildren: () => import('./customertype/customertype.module').then( m => m.CustomertypePageModule)
  },
  {
    path: 'corporatecards',
    loadChildren: () => import('./corporatecards/corporatecards.module').then( m => m.CorporatecardsPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
