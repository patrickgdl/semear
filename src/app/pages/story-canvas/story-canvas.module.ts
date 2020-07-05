import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { StoryCanvasChatPage } from './chat/story-canvas-chat.page';
import { StoryCanvasDrawingsPage } from './drawings/story-canvas-drawings.page';

@NgModule({
  declarations: [StoryCanvasChatPage, StoryCanvasDrawingsPage],
  imports: [IonicModule, CommonModule]
})
export class StoryCanvasModule {}
