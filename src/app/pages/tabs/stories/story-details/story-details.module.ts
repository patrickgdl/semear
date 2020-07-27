import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { WebSpeechModule } from 'app/components/web-speech/web-speech.module';

import { StoryDetailsFanficPage } from '../story-details/fanfic/story-details-fanfic.page';
import { StoryDetailsIllustratorPage } from '../story-details/illustrator/story-details-illustrator.page';
import { StoryDetailsPainterPage } from '../story-details/painter/story-details-painter.page';
import { StoryDetailsQuizPage } from '../story-details/quiz/story-details-quiz.page';
import { StoryDetailsRecorderPage } from '../story-details/recorder/story-details-recorder.page';
import { StoryDetailsWriterPage } from '../story-details/writer/story-details-writer.page';
import { CanvasPainterModule } from './../../../../components/canvas-painter/canvas-painter.module';
import { CanvasModule } from './../../../../components/canvas/canvas.module';
import { StoryDetailsDiscussionPage } from './discussion/story-details-discussion.page';
import { StoryDetailsGamesPage } from './games/story-details-games.page';
import { StoryDetailsIntroPage } from './intro/story-details-intro.page';
import { StoryDetailsPage } from './story-details.page';

@NgModule({
  imports: [CommonModule, IonicModule, CanvasModule, CanvasPainterModule, WebSpeechModule],
  exports: [StoryDetailsPage, StoryDetailsDiscussionPage, StoryDetailsIntroPage],
  declarations: [
    StoryDetailsPage,
    StoryDetailsIntroPage,
    StoryDetailsDiscussionPage,
    StoryDetailsGamesPage,
    StoryDetailsFanficPage,
    StoryDetailsIllustratorPage,
    StoryDetailsPainterPage,
    StoryDetailsQuizPage,
    StoryDetailsRecorderPage,
    StoryDetailsWriterPage
  ],
  providers: []
})
export class StoryDetailsModule {}
