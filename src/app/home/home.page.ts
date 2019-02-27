import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public userData: any;
  constructor(
    private navCtrl: NavController,
  ) {
    this.ionicInit();
  }

  ionicInit() {
    this.userData = JSON.parse(localStorage.getItem('loginData'));
    console.log(this.userData);
  }
}
