import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import firebase from 'firebase';

import { UserProfile } from './../../models/user-profile';
import { Teacher } from '../../models/teacher';
import { TeacherProvider } from '../teacher/teacher';

@Injectable()
export class AuthProvider {

  constructor(public afAuth: AngularFireAuth,
              public fireStore: AngularFirestore,
              public teacherProvider: TeacherProvider)
  {             
  }

  loginUser(email: string, password: string): Promise<firebase.User> {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password);
  }

  resetPassword(email: string): Promise<void> {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  logoutUser(): Promise<void> {
    return this.afAuth.auth.signOut();
  }

  async createAdminUser(email: string, password: string, title: string, firstName: string, lastName: string): Promise<firebase.User> {

    try {
      const adminUser: firebase.User = await this.afAuth.auth.createUserWithEmailAndPassword(email, password);
      const userProfileDocument: AngularFirestoreDocument<UserProfile>
        = this.fireStore.doc(`userProfile/${adminUser.uid}`);

      await userProfileDocument.set({
        id: adminUser.uid,
        email: email,
        isAdmin: true,
        firstName: firstName, 
        lastName: lastName
      });

      const teacher: Teacher = {
        teacherId: adminUser.uid,
        title: title, 
        firstName: firstName, 
        lastName: lastName
      }
      await this.teacherProvider.createTeacher(teacher)
            
      return adminUser;

     } catch (error) {
      console.error(error);
    }
  }

}
