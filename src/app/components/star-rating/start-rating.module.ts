import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { StarRatingComponent } from './star-rating.component';

@NgModule({
  imports: [CommonModule, IonicModule],
  exports: [StarRatingComponent],
  declarations: [StarRatingComponent],
  providers: []
})
export class StarRatingModule {}
