import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from 'angularfire2/firestore';
import firebase from 'firebase';
import { Teacher } from '../../models/teacher';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class TeacherProvider {
  userId: string; 

  constructor(public afAuth: AngularFireAuth, 
              public fireStore: AngularFirestore) {
    afAuth.authState.subscribe(user => {
      if (user) {
        this.userId = user.uid;
      }
    })
  }

  async createTeacher(teacher: Teacher): Promise<void> {
    if (!(teacher.teacherId)){
      teacher.teacherId = this.fireStore.createId();
    }

    await this.fireStore.collection<Teacher>('/teachers',
      ref => ref  
        .where("firstName", "==", teacher.firstName )
        .where("lastName", "==", teacher.lastName )).valueChanges().subscribe( teach => {
          if (teach.length > 0) {
            teacher.teacherId = teach[0].teacherId;
          }

          // now create the teacher document.
          this.fireStore.doc<Teacher>(`/teachers/${teacher.teacherId}`)
          .set(
            teacher
          );
        });

    return;
  }

  updateTeacher(teacher: Teacher): Promise<void> {
    return this.fireStore.doc(`/teachers/${teacher.teacherId}`).update(teacher);
  }

  getTeachers(): AngularFirestoreCollection<Teacher> {
    return this.fireStore.collection<Teacher>( 
      `/teachers`, 
      ref => ref.orderBy('firstName')
    );
  }

  getTeacher(teacherId: string ): Observable<Teacher> {
    const doc: AngularFirestoreDocument<Teacher>  = this.fireStore.doc(`/teachers/${teacherId}`);
    return doc.valueChanges();
  }

}
