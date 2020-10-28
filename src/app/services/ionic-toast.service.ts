import { Injectable} from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class IonicToastService {

  private myToast: any;

  constructor(
    private toast: ToastController,
  ) {}

  cardCreatedToast() {
    this.myToast = this.toast.create({
      message: 'Visiting Card Created Successfully!',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  sentCardToast() {
    this.myToast = this.toast.create({
      message: 'Sent Successfully!',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  corporateAdminCreatedToast() {
    this.myToast = this.toast.create({
      message: 'Registation Successfull!',
      duration: 2000
    }).then((toastData) => {
      console.log(toastData);
      toastData.present();
    });
  }

  HideToast() {
    this.myToast = this.toast.dismiss();
  }

}
