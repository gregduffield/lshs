import { Injectable } from '@angular/core';
import { Walk } from '../../models/walk';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class WalkProvider {
  teacherId: string;

  constructor(public fireStore: AngularFirestore, 
              afAuth: AngularFireAuth) {
    afAuth.authState.subscribe(user => {
        if(user) {
          this.teacherId = user.uid;
        }
    });
  }

  saveWalk(walk: Walk): Promise<void> {

    if (walk.walkId === undefined){
      walk.walkId = this.fireStore.createId();
    }

    return this.fireStore.doc<Walk>(`/walks/${walk.walkId}`)
      .set(Object.assign({}, walk));
  }

  updateWalk(walk: Walk): Promise<void> {
    return this.fireStore.doc<Walk>(`/walks/${walk.walkId}`)
      .update(Object.assign({}, walk));
  }

  getMyWalks(): AngularFirestoreCollection<Walk> {

    return this.fireStore.collection<Walk>(
      '/walks',
      ref => 
        ref
        .where('observerTeacher.teacherId', "==", this.teacherId)  
    );
  }

  getWalk(walkId: string): Observable<Walk> {
    return this.fireStore.doc<Walk>(`/walks/${walkId}`).valueChanges();
  }

  delete(walkId: string): Promise<void> {
    return this.fireStore.doc<Walk>(`/walks/${walkId}`).delete();
  }
}
