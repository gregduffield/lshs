import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WalksPage } from '../walks/walks';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

  gotoProfile(): void {
    this.navCtrl.push("ProfilePage");
  }

  addWalk(): void {
    this.navCtrl.push("WalkAddPage");
  }

  viewWalks(): void {
    this.navCtrl.push(WalksPage);
  }
}
