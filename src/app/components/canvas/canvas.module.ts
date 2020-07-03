import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CanvasPage } from './canvas.page';

@NgModule({
  declarations: [CanvasPage],
  exports: [CanvasPage],
  imports: [CommonModule],
})
export class CanvasModule {}
