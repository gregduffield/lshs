import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TeacherAddPage } from './teacher-add';

@NgModule({
  declarations: [
    TeacherAddPage,
  ],
  imports: [
    IonicPageModule.forChild(TeacherAddPage),
  ],
})
export class TeacherAddPageModule {}
