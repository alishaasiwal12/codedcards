import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';

import { Savedcard } from '../savedcards.model';
import { SendingService } from '../profile/profile.service';
import { Sending } from '../profile/profile.model';

import {Contacts, Contact, ContactName, ContactField} from '@ionic-native/contacts/ngx';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {SMS, SmsOptions} from '@ionic-native/sms/ngx';

@Component({
  selector: 'app-sharedcards',
  templateUrl: './sharedcards.page.html',
  styleUrls: ['./sharedcards.page.scss'],
})
export class SharedcardsPage implements OnInit, OnDestroy {
  account: Savedcard;
  sharedImage: string;
  loadedNetworks: Sending[];
  isLoading = false;
  private sendingSub: Subscription;

  imgAr = ['bird1.jpg', 'bird2.jpg', 'bird3.jpg', 'bird4.jpg', 'bird5.jpg', 'bird6.jpg', 'bird7.png', 'bird8.jpg'];
  path = "../../../assets/images";

  constructor(
    private sendingService: SendingService,
    private loadingCtrl: LoadingController,
    public contacts: Contacts,
    public callNumber: CallNumber,
    public sms: SMS
    ) { }

  ngOnInit() {
    this.sendingSub = this.sendingService.sendings.subscribe(sendings => {
      this.loadedNetworks = sendings;
    });
  }


  ionViewWillEnter() {
    this.isLoading = true;
    this.sendingService.fetchSharedcards().subscribe(() => {
      this.isLoading = false;
    });
  }

  getRandomImage() {
    // path = path || 'images/'; // default path here
    var num = Math.floor( Math.random() * this.imgAr.length );
    var img = this.imgAr[ num ];
    var imgStr = '<img src="' + this.path + img + '" alt = "">';
    document.write(imgStr); document.close();
}

  callContact(contact: number, slidingEl: IonItemSliding){
    slidingEl.close();
    // let phone = contact.toString();
    this.callNumber.callNumber(JSON.stringify(contact), true);
  }

  sendSms(contact: number, slidingEl: IonItemSliding){
    slidingEl.close();
    // let phone = contact.toString();
    this.sms.send(JSON.stringify(contact), 'Hello!');
  }

  onDeleteSharedCard(receiverId: string, slidingEl: IonItemSliding) {
    slidingEl.close();
    this.loadingCtrl.create({ message: 'Deleting...' }).then(loadingEl => {
      loadingEl.present();
      this.sendingService.deleteCard(receiverId).subscribe(() => {
        loadingEl.dismiss();
      });
    });
  }

  ngOnDestroy() {
    if (this.sendingSub) {
      this.sendingSub.unsubscribe();
    }
  }

}
