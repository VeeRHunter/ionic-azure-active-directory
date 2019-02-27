import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  isLoading = false;
  public loading;

  constructor(
    public loadingCtrl: LoadingController
  ) {

  }

  async present() {
    this.isLoading = true;
    console.log(this.loading);
    return await this.loadingCtrl.create({
      message: 'Please wait...'
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }

}
