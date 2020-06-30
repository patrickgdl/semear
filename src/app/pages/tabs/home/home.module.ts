import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';

import { SharedModule } from '../../../shared/shared.module';
import { HomePage } from './home.page';

@NgModule({
  imports: [IonicModule, CommonModule, FormsModule, SharedModule, RouterModule.forChild([{ path: '', component: HomePage }])],
  declarations: [HomePage],
})
export class HomePageModule {}
