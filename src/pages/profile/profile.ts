import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserProfile } from '../../models/user-profile';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  userProfile: UserProfile;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController,
    public profileProvider: ProfileProvider,
    afAuth: AngularFireAuth) {

  }

  ionViewDidLoad() {
    try {
      this.profileProvider.getUserProfile().valueChanges().subscribe(up => {
        this.userProfile = up
      });
    } catch (error) {
      this.navCtrl.push("LoginPage");
    }
  }

  updateName(): void {
    const alert: Alert = this.alertCtrl.create({
      message: "Youir first name and last name",
      inputs: [
        {
          name: "firstName",
          placeholder: "Your first name",
          value: this.userProfile.firstName
        },
        {
          name: "lastName",
          placeholder: "Your last name",
          value: this.userProfile.lastName
        }
      ],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save",
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }
  updateEmail(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [{ name: "newEmail", placeholder: "your new email" },
      { name: "password", placeholder: "Your password", type: "password" }],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save", handler: data => {
            this.profileProvider.updateEmail(data.newEmail, data.password)
              .then(() => { console.log('Email changed successfully'); })
              .catch(error => console.error(error));
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword(): void {
    let alert: Alert = this.alertCtrl.create({
      inputs: [
        { name: "oldPassword", placeholder: "Old Password", type: "password" },
        { name: "newPassword", placeholder: "New password", type: "password" }],
      buttons: [
        { text: "Cancel" },
        {
          text: "Save", handler: data => {
            this.profileProvider.updatePassword(data.newPassword, data.oldPassword)
              .then(() => { console.log('Email changed successfully'); })
              .catch(error => console.error(error));
          }
        }
      ]
    });
    alert.present();
  }

  logOut(): void {
    this.profileProvider.logout().then(() => {
      this.navCtrl.setRoot("LoginPage");
    })
  }
}
