import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  public toast;

  constructor(
    public toastCtrl: ToastController,
  ) {
    console.log('Hello ToastProvider Provider');
  }
  async present(toastMessage) {
    const toast = await this.toastCtrl.create({
      message: toastMessage,
      duration: 3000,
      color: 'dark',
      mode: 'ios'
    });
    toast.present();
  }

}
