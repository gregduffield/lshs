import { Component } from '@angular/core';
import { IonicPage, NavController, Loading, LoadingController } from 'ionic-angular';
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
  loading: Loading;

  constructor(public navCtrl: NavController,
              public loadingCtrl: LoadingController,
              public teacherProvider: TeacherProvider,
              ) {
        this.loading = this.loadingCtrl.create();
        this.loading.present();
  }

  ionViewDidLoad() {
    this.teachers = this.teacherProvider.getTeachers().valueChanges();
    this.loading.dismiss();
  }

  addTeacher(): void {
    this.navCtrl.push('TeacherAddPage');
  }

  editTeacher(teacherId: string): void {
    this.navCtrl.push("TeacherAddPage", {teacherId: teacherId});
  }

}
