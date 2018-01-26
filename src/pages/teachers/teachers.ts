import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Loading, LoadingController, Alert, AlertController } from 'ionic-angular';
import { TeacherProvider } from '../../providers/teacher/teacher';
import { Observable } from 'rxjs/Observable';
import { Teacher } from '../../models/teacher';


@IonicPage()
@Component({
  selector: 'page-teachers',
  templateUrl: 'teachers.html',
})
export class TeachersPage {
  teachers: Observable<Teacher[]>;
  
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController, 
              public loadingCtrl: LoadingController,
              public teacherProvider: TeacherProvider,
              ) {

  }

  ionViewDidLoad() {
    this.teachers = this.teacherProvider.getTeachers().valueChanges();
  }

  addTeacher(): void {
    this.navCtrl.push('TeacherAddPage');
  }

  editTeacher(teacherId: string): void {
    this.navCtrl.push("TeacherAddPage", {teacherId: teacherId});
  }

}
