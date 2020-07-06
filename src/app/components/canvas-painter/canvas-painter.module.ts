import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { CanvasPainterPage } from './canvas-painter.page';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [CanvasPainterPage],
  exports: [CanvasPainterPage]
})
export class CanvasPainterModule {}
