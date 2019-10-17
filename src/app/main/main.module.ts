import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { MainPage } from './main.page';
import { MainRoutingModule } from './main-routing.module';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    MainRoutingModule
  ],
  declarations: [MainPage]
})
export class MainPageModule {}
