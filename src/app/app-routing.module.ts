import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { TutorialGuard } from './guards/tutorial.guard';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then((m) => m.TabsPageModule),
    canActivate: [TutorialGuard]
  },
  {
    path: 'tutorial',
    loadChildren: () => import('./pages/tutorial/tutorial.module').then((m) => m.TutorialPageModule)
  },
  { path: 'fcm', loadChildren: () => import('./pages/fcm/fcm.module').then((m) => m.FcmPageModule) },
  { path: 'story-canvas', loadChildren: () => import('./pages/story-canvas/story-canvas.module').then((m) => m.StoryCanvasModule) }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
