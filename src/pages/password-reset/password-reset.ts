import { Component } from '@angular/core';
import { IonicPage, 
         NavController, 
         NavParams,
         Alert,
         AlertController,
         Loading, 
         LoadingController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';

@IonicPage()
@Component({
  selector: 'page-password-reset',
  templateUrl: 'password-reset.html',
})
export class PasswordResetPage {
  passwordResetForm: FormGroup;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController, 
              public alertCtrl: AlertController, 
              public authProvider: AuthProvider,
              formBuilder: FormBuilder) {
    
    this.passwordResetForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])]
    });
  }

  async resetPassword(): Promise<any> {
    if(!this.passwordResetForm.valid) {

    } else {
      let loading: Loading = this.loadingCtrl.create();
      loading.present();
      const email: string = this.passwordResetForm.value.email;
      try{
        await this.authProvider.resetPassword(email);
        await loading.dismiss();
        
        const alert: Alert = this.alertCtrl.create({
          message: `Check your inbox`,
          buttons:[{
            text: "Ok", role:"cancel",
            handler: data => {
              this.navCtrl.pop();
            }
          }]
        });
        alert.present();
      } catch(error) {
        await loading.dismiss();
        const alert: Alert = this.alertCtrl.create({
          message: error.message, 
          buttons: [{text:"Ok", role: "cancel"}]
        });
        alert.present();
      }
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PasswordResetPage');
  }

}
