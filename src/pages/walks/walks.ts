import { Component } from '@angular/core';
import { NavController, NavParams, Loading, LoadingController } from 'ionic-angular';
import { WalkProvider } from '../../providers/walk/walk';
import { Walk } from '../../models/walk';

@Component({
  selector: 'page-walks',
  templateUrl: 'walks.html',
})
export class WalksPage {
  public walks: Walk[];
  spinner: Loading;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams,
              public loadingCtrl: LoadingController, 
              public walkProvider: WalkProvider) {
    this.spinner = this.loadingCtrl.create();
    this.spinner.present();
  }

  ionViewDidLoad() {
    this.walkProvider.getMyWalks().valueChanges().subscribe(walks => {
      this.walks = walks;
      this.spinner.dismiss();
    })
  }

  addWalk(): void {
    this.navCtrl.push("WalkAddPage");
  }

  editWalk(walkId: string): void {
    this.navCtrl.push("WalkAddPage", {walkId: walkId});
  }

}
