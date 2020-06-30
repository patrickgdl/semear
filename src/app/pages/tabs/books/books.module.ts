import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BooksPageRoutingModule } from './books-routing.module';
import { BooksPage } from './books.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, BooksPageRoutingModule],
  declarations: [BooksPage],
})
export class BooksPageModule {}
