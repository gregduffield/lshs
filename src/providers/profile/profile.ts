import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore,
         AngularFirestoreDocument} from 'angularfire2/firestore';
import { User } from 'firebase';
import firebase from 'firebase';
import { UserProfile } from '../../models/user-profile';

@Injectable()
export class ProfileProvider {
  currentUser: User;
  userProfileDoc: AngularFirestoreDocument<UserProfile>;
  

  constructor(private afAuth: AngularFireAuth, 
              public fireStore: AngularFirestore) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.currentUser = user;
        this.userProfileDoc = this.fireStore.doc(`/userProfile/${this.currentUser.uid}`)
      }
    })
  }

  getUserProfile():  AngularFirestoreDocument<UserProfile>{
    return this.userProfileDoc;
  }

  updateName(firstName: string, lastName: string) : Promise<any> {
    
    return this.userProfileDoc.update({firstName: firstName, lastName: lastName});
  }

  updateEmail(newEmail: string, password: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, password);

    return this.currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then(user => {
        this.currentUser.updateEmail(newEmail)
        .then (user => {
          this.userProfileDoc.update({email: newEmail});
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  
  updatePassword(newPassword: string, oldPassword: string): Promise<any> {
    const credential: firebase.auth.AuthCredential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, oldPassword);

    return this.currentUser
      .reauthenticateAndRetrieveDataWithCredential(credential)
      .then( user => {
        this.currentUser.updatePassword(newPassword)
        .then (user => {
          console.log("Password Changed");
        })
      })
      .catch(error => {
        console.error(error);
      });
  }

  logout(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
