import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { StoryDetailsGamesPage } from './story-details-games.page';

const routes: Routes = [
  {
    path: '',
    component: StoryDetailsGamesPage
  }
];

@NgModule({
  imports: [IonicModule, CommonModule, RouterModule.forChild(routes)],
  exports: [StoryDetailsGamesPage],
  declarations: [StoryDetailsGamesPage],
  providers: []
})
export class StoryDetailsGamesModule {}
