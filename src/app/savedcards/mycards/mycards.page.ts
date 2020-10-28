import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonItemSliding, MenuController, LoadingController } from '@ionic/angular';
import { SegmentChangeEventDetail } from '@ionic/core';
import { switchMap, take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

import { SendingService } from '../profile/profile.service';
import { AuthService } from '../../auth/auth.service';
import { Sending } from '../profile/profile.model';

import { Plugins, AppState } from '@capacitor/core';

const { App } = Plugins;

import {Contacts, Contact, ContactName, ContactField} from '@ionic-native/contacts/ngx';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {SMS, SmsOptions} from '@ionic-native/sms/ngx';


@Component({
  selector: 'app-mycards',
  templateUrl: './mycards.page.html',
  styleUrls: ['./mycards.page.scss'],
})
export class MycardsPage implements OnInit, OnDestroy {
  isLoading = false;
  loadedSavedcards: Sending[];
  listedLoadedSavedcards: Sending[];
  relevantSavedcards: Sending[];
  private sendingSub: Subscription;

  constructor(
    private sendingService: SendingService,
    private menuCtrl: MenuController,
    private loadingCtrl: LoadingController,
    public contacts: Contacts,
    public callNumber: CallNumber,
    public sms: SMS
  ) { }

  ngOnInit() {
    this.sendingSub = this.sendingService.sendings.subscribe(sendings => {
      this.loadedSavedcards = sendings;
      this.relevantSavedcards = this.loadedSavedcards;
      // this.listedLoadedSavedcards = this.relevantSavedcards.slice(1);
      this.listedLoadedSavedcards = this.relevantSavedcards;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.sendingService.fetchSavedcards().subscribe(() => {
      
      this.isLoading = false;
    });
  }

  onOpenMenu() {
    this.menuCtrl.toggle();
  }

  async onOpenSocial(urltoopen: string){
    // var ret = await App.canOpenUrl({ url: urltoopen});
    // var retx = await App.openUrl({ url: urltoopen });
    // console.log('Open url response: ', ret);
    window.open(urltoopen,'_blank','location=yes');
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

  onDeleteReceivedCard(receiverId: string, slidingEl: IonItemSliding) {
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