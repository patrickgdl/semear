import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CanvasPainterPage } from './canvas-painter.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule],
  declarations: [CanvasPainterPage],
  exports: [CanvasPainterPage]
})
export class CanvasPainterModule {}
