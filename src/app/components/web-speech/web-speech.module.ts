import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { WebSpeechPage } from './web-speech.page';

@NgModule({
  declarations: [WebSpeechPage],
  exports: [WebSpeechPage],
  imports: [CommonModule, IonicModule]
})
export class WebSpeechModule {}
