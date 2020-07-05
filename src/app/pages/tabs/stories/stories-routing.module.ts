import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoriesPage } from './stories.page';
import { StoryDetailsDiscussionPage } from './story-details/discussion/story-details-discussion.page';
import { StoryDetailsGamesPage } from './story-details/games/story-details-games.page';
import { StoryDetailsPage } from './story-details/story-details.page';

const routes: Routes = [
  {
    path: '',
    component: StoriesPage
  },
  {
    path: ':id',
    component: StoryDetailsPage,
    children: [
      {
        path: 'games',
        component: StoryDetailsGamesPage
      },
      {
        path: 'discussion',
        component: StoryDetailsDiscussionPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoriesPageRoutingModule {}
