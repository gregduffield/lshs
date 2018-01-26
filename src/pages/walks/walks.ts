import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { WalkProvider } from '../../providers/walk/walk';
import { Walk } from '../../models/walk';

@Component({
  selector: 'page-walks',
  templateUrl: 'walks.html',
})
export class WalksPage {
  public walks: Observable<Walk[]>;
  
  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController, 
              public walkProvider: WalkProvider) {
  }

  ionViewDidLoad() {
    this.walks = this.walkProvider.getMyWalks().valueChanges();
  }

  addWalk(): void {
    this.navCtrl.push("WalkAddPage");
  }

  editWalk(walkId: string): void {
    this.navCtrl.push("WalkAddPage", {walkId: walkId});
  }

}
