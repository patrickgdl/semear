import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { StoryDetailsDiscussionPage } from './discussion/story-details-discussion.page';
import { StoryDetailsGamesPage } from './games/story-details-games.page';
import { StoryDetailsIntroPage } from './intro/story-details-intro.page';
import { StoryDetailsPage } from './story-details.page';

@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [StoryDetailsPage, StoryDetailsDiscussionPage, StoryDetailsIntroPage],
  declarations: [StoryDetailsPage, StoryDetailsIntroPage, StoryDetailsDiscussionPage, StoryDetailsGamesPage],
  providers: []
})
export class StoryDetailsModule {}
