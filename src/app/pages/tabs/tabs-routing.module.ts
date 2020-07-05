import { StoryDetailsDiscussionPage } from './stories/story-details/discussion/story-details-discussion.page';
import { StoryDetailsGamesPage } from './stories/story-details/games/story-details-games.page';
import { StoryDetailsPage } from './stories/story-details/story-details.page';
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
        redirectTo: '/home',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
