import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StoriesPage } from './stories.page';
import { StoryDetailsDiscussionPage } from './story-details/discussion/story-details-discussion.page';
import { StoryDetailsGamesPage } from './story-details/games/story-details-games.page';
import { StoryDetailsIntroPage } from './story-details/intro/story-details-intro.page';
import { StoryDetailsPage } from './story-details/story-details.page';
import { StoryDetailsFanficPage } from './story-details/fanfic/story-details-fanfic.page';
import { StoryDetailsIllustratorPage } from './story-details/illustrator/story-details-illustrator.page';
import { StoryDetailsPainterPage } from './story-details/painter/story-details-painter.page';
import { StoryDetailsQuizPage } from './story-details/quiz/story-details-quiz.page';
import { StoryDetailsRecorderPage } from './story-details/recorder/story-details-recorder.page';
import { StoryDetailsWriterPage } from './story-details/writer/story-details-writer.page';

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
      },
      {
        path: 'fanfic',
        component: StoryDetailsFanficPage
      },
      {
        path: 'illustrator',
        component: StoryDetailsIllustratorPage
      },
      {
        path: 'painter',
        component: StoryDetailsPainterPage
      },
      {
        path: 'quiz',
        component: StoryDetailsQuizPage
      },
      {
        path: 'recorder',
        component: StoryDetailsRecorderPage
      },
      {
        path: 'writer',
        component: StoryDetailsWriterPage
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoriesPageRoutingModule {}
