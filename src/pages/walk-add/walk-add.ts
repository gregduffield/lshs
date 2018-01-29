import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, Loading, LoadingController } from 'ionic-angular';
import { WalkProvider } from '../../providers/walk/walk';
import { TeacherProvider } from '../../providers/teacher/teacher';
import { Teacher } from '../../models/teacher';
import { Walk } from '../../models/walk';
import { User } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { WalksPage } from '../walks/walks';

@IonicPage()
@Component({
  selector: 'page-walk-add',
  templateUrl: 'walk-add.html',
})
export class WalkAddPage {

  teachers: Teacher[];
  _walk: Walk = new Walk();



  _period: string;
  _observedTeachers: any;

  currentUser: User;
  walkId: string;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public walksProvider: WalkProvider,
    public teacherProvider: TeacherProvider,
    afAuth: AngularFireAuth) {

    if (navParams.get('walkId')) {
      this.walkId = navParams.get('walkId');

      this.walksProvider.getWalk(this.walkId).subscribe(walk => {
        this._walk = walk;
      });
    } else {
      this._walk = new Walk();
    }


    this.teacherProvider.getTeachers().valueChanges().subscribe(teachers => {
      this.teachers = teachers;

    });

    afAuth.authState.subscribe(user => {
      this.currentUser = user;
      //this._walk.observerTeacher = this.teachers.find(x=> x.teacherId == user.uid);
    })



  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WalksAddPage');
  }

  addTeacher(): void {
    const prompt: Alert = this.alertCtrl.create({
      message: "Select the teacher(s) that you saw on this walk"
    });

    this.teachers.forEach(teacher => {
      if (teacher.teacherId !== this.currentUser.uid) { // we cannot observe ourself
        prompt.addInput({
          type: 'checkbox',
          label: `${teacher.firstName} ${teacher.lastName} `,
          value: teacher.teacherId,
          checked: this._walk.observedTeachers && this._walk.observedTeachers.findIndex(t => t.teacherId == teacher.teacherId) > -1 ? true : false
        });
      }
    });

    prompt.addButton({
      text: "Ok",
      handler: data => {
        data.forEach(d => {
          this.teacherProvider.getTeacher(d).subscribe(t => {
            if (this._walk.observedTeachers.findIndex(x => x.teacherId == t.teacherId) < 0) {
              this._walk.observedTeachers.push(t);
            }
          });
        });

      }
    })
    prompt.present();
  }

  async saveWalk(): Promise<void> {

    // get the observer teacher from the teachers
    const observer: Teacher = this.teachers.find(x => x.teacherId == this.currentUser.uid);
    const loading: Loading = this.loadingCtrl.create();

    loading.present();
    try {
      this._walk.observerTeacher = observer;
      await this.walksProvider.saveWalk(this._walk);
      loading.dismiss();
      this.navCtrl.pop();
    }
    catch (error) {
      loading.dismiss();
      console.error(error);
    }
  }

  async removeTeacher(teacherId: string): Promise<void> {
    this._walk.observedTeachers.splice(this._walk.observedTeachers.findIndex(t => t.teacherId == teacherId), 1)
  }

  async deleteWalk(walkId: string): Promise<void> {
    const prompt: Alert = this.alertCtrl.create({
      title: "Delete?",
      message: "Are you sure you want to remove this learning walk?",
      buttons: [{
        text: 'Yes',
        handler: data => {
          this.walksProvider.delete(walkId);
          this._walk = new Walk(); // clear out any stored data
          this.navCtrl.push(WalksPage);
        }
      },
      {
        text: 'No'
      }]
    });
    prompt.present();

  }

}
