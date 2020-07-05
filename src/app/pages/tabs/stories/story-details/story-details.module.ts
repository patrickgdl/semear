import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { StoryDetailsDiscussionPage } from './discussion/story-details-discussion.page';
import { StoryDetailsGamesModule } from './games/story-details-games.module';
import { StoryDetailsGamesPage } from './games/story-details-games.page';
import { StoryDetailsPage } from './story-details.page';

const routes: Routes = [
  {
    path: '',
    component: StoryDetailsPage,
    children: [
      {
        path: 'games',
        component: StoryDetailsGamesPage
      }
    ]
  }
];

@NgModule({
  imports: [IonicModule, CommonModule, StoryDetailsGamesModule],
  exports: [StoryDetailsPage, StoryDetailsDiscussionPage],
  declarations: [StoryDetailsPage, StoryDetailsDiscussionPage],
  providers: []
})
export class StoryDetailsModule {}
