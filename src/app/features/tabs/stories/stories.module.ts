import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { StoriesPageRoutingModule } from './stories-routing.module';
import { StoriesPage } from './stories.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, StoriesPageRoutingModule],
  declarations: [StoriesPage],
})
export class StoriesPageModule {}
