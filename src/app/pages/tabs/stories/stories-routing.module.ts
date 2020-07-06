import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoriesPage } from './stories.page';
import { StoryDetailsDiscussionPage } from './story-details/discussion/story-details-discussion.page';
import { StoryDetailsGamesPage } from './story-details/games/story-details-games.page';
import { StoryDetailsIntroPage } from './story-details/intro/story-details-intro.page';
import { StoryDetailsPage } from './story-details/story-details.page';
import { StoryQuizPage } from './story-quiz/story-quiz.page';

const routes: Routes = [
  {
    path: '',
    component: StoriesPage
  },
  {
    path: 'quiz',
    component: StoryQuizPage
  },
  {
    path: ':id',
    component: StoryDetailsPage,
    children: [
      {
        path: 'intro',
        component: StoryDetailsIntroPage
      },
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
export class StoriesPageRoutingModule { }
