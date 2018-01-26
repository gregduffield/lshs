import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { WalkAddPage } from './walk-add';
import { FormsModule } from '@angular/forms'

@NgModule({
  declarations: [
    WalkAddPage,
  ],
  imports: [
    IonicPageModule.forChild(WalkAddPage),
    FormsModule,
  ],
})
export class WalksAddPageModule {}
