import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Alert, Loading, LoadingController } from 'ionic-angular';
import { TeacherProvider } from '../../providers/teacher/teacher';
import { FormBuilder, FormGroup,Validators  } from '@angular/forms';
import { Teacher } from '../../models/teacher';


@IonicPage()
@Component({
  selector: 'page-teacher-add',
  templateUrl: 'teacher-add.html',
})
export class TeacherAddPage {
  addTeacherForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public teacherProvider: TeacherProvider,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              formBuilder: FormBuilder) {

    if (navParams.get('teacherId')){
      this.teacherProvider.getTeacher(navParams.get('teacherId')).subscribe(teacher => {
        if (teacher){
          this.addTeacherForm = formBuilder.group({
            title: [teacher.title, Validators.compose([Validators.required])],
            firstName: [teacher.firstName, Validators.compose([Validators.required])],
            lastName: [teacher.lastName, Validators.compose([Validators.required])]
          });
        }
      });
    }
    this.addTeacherForm = formBuilder.group({
      title: ['', Validators.compose([Validators.required])],
      firstName: ['', Validators.compose([Validators.required])],
      lastName: ['', Validators.compose([Validators.required])]
    });
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeacherAddPage');
  }

  async addTeacher(): Promise<void> {
      if (!this.addTeacherForm.valid) {
        const alert: Alert = this.alertCtrl.create({
          message: "Please check what you have entered and retry",
          buttons:[{text:'Ok', role:'cancel'}]
        });
        alert.present();
        return;
      }

      const loading: Loading = this.loadingCtrl.create();
      loading.present();

      const title = this.addTeacherForm.value.title;
      const firstName = this.addTeacherForm.value.firstName;
      const lastName = this.addTeacherForm.value.lastName;

      const teacherId: string = this.navParams.get('teacherId');
      const t: Teacher = {
        firstName: firstName, 
        lastName: lastName, 
        title: title,
        teacherId: teacherId
      };


      try{
        if (t.teacherId){
          await this.teacherProvider.updateTeacher(t);
        }else{
         await this.teacherProvider.createTeacher(t);
        }
        loading.dismiss();
        this.navCtrl.pop();
      } 
      catch (error) {
        loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message,
          buttons:[{text:'Ok', role:'cancel'}]
        });
        alert.present();
      }
  }

}
