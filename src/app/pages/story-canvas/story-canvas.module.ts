import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { StoryCanvasChatPage } from './chat/story-canvas-chat.page';
import { StoryCanvasDrawingsPage } from './drawings/story-canvas-drawings.page';
import { StoryCanvasPage } from './story-canvas.page';

const routes: Routes = [
  {
    path: ':id',
    component: StoryCanvasPage,
    children: [
      {
        path: 'chat',
        component: StoryCanvasPage
      },
      {
        path: 'drawing',
        component: StoryCanvasDrawingsPage
      }
    ]
  }
];

@NgModule({
  declarations: [StoryCanvasChatPage, StoryCanvasDrawingsPage, StoryCanvasPage],
  exports: [StoryCanvasChatPage, StoryCanvasDrawingsPage, StoryCanvasPage],
  imports: [IonicModule, CommonModule, RouterModule.forChild(routes)]
})
export class StoryCanvasModule {}
