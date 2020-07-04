import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';

import { BookDetailsPage } from './book-details.page';

@NgModule({
  imports: [IonicModule, CommonModule],
  declarations: [BookDetailsPage],
})
export class BookDetailsModule {}
