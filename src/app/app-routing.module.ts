import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';
import { TutorialGuard } from './guards/tutorial.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [TutorialGuard],
  },
  {
    path: 'tutorial',
    loadChildren: './tutorial/tutorial.module#TutorialPageModule',
  },
  { path: 'fcm', loadChildren: './pages/fcm/fcm.module#FcmPageModule' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
