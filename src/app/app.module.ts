import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, Injectable, Injector } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { firebaseConfig } from './credentials';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { WalksPage } from '../pages/walks/walks';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthProvider } from '../providers/auth/auth';
import { WalkProvider } from '../providers/walk/walk';
import { TeacherProvider } from '../providers/teacher/teacher';
import { TeachersPage } from '../pages/teachers/teachers';
import { ProfileProvider } from '../providers/profile/profile';
import { Pro } from '@ionic/pro';

const IonicPro = Pro.init('', {
  appVersion: "1.0.0"
})

@Injectable()
export class MyErrorHandler implements ErrorHandler {
  ionicErrorHandler: IonicErrorHandler;

  constructor(injector: Injector) {
    try{
      this.ionicErrorHandler= injector.get(IonicErrorHandler);
    } catch(e) {

    }
  }

  handleError(err: any): void {
    IonicPro.monitoring.handleNewError(err);
    this.ionicErrorHandler && this.ionicErrorHandler.handleError(err);
  }
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    WalksPage,
    TeachersPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage, 
    WalksPage,
    TeachersPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    WalkProvider,
    TeacherProvider,
    ProfileProvider,
    IonicErrorHandler, 
    [{provide: ErrorHandler, useClass: MyErrorHandler}]
  ]
})
export class AppModule {}
