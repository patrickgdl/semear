import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StoriesPageRoutingModule } from './stories-routing.module';
import { StoriesPage } from './stories.page';
import { StoryDetailsModule } from './story-details/story-details.module';
import { StoryQuizPage } from './story-quiz/story-quiz.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, StoriesPageRoutingModule, StoryDetailsModule],
  declarations: [StoriesPage, StoryQuizPage]
})
export class StoriesPageModule {}
