import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then((m) => m.HomePageModule)
      },
      {
        path: 'stories',
        loadChildren: () => import('./stories/stories.module').then((m) => m.StoriesPageModule)
      },
      {
        path: 'books',
        loadChildren: () => import('./books/books.module').then((m) => m.BooksPageModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./profile/profile.module').then((m) => m.ProfilePageModule)
      },
      {
        path: '',
        redirectTo: '/home'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
