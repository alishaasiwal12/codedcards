import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  IonItemSliding,
  LoadingController,
  AlertController
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SavedcardsService } from '../savedcards.service';
import { Savedcard } from '../savedcards.model';
import { AuthService } from '../../auth/auth.service';
import { SendingService } from '../profile/profile.service';
import { IonicToastService } from '../../services/ionic-toast.service';
import { ToastController } from '@ionic/angular';
import { Contacts, Contact, ContactName, ContactField } from '@ionic-native/contacts/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { SMS, SmsOptions } from '@ionic-native/sms/ngx';

import { Plugins, AppState } from '@capacitor/core';

const { App } = Plugins;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})

export class ProfilePage implements OnInit, OnDestroy {
  smsText: string;
  message: string;
  SenderPhone: string;
  account: Savedcard;
  receiver: Savedcard;
  ContactNumber: number
  isAvailable = false;
  isExists = false;
  form: FormGroup;
  isLoading = false;
  private SavedcardsSub: Subscription;
  public notifications: any;
  public isSubscribed: boolean;
  private TOPIC_NAME = 'homeTopic';

  linkedin = false;
  facebook = false;
  instagram = false;

  constructor(
    private ionicToastService: IonicToastService,
    private toastController: ToastController,
    private savedcardsService: SavedcardsService,
    private sendingService: SendingService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
    public sms: SMS
  ) { this.isSubscribed = false; }

  ngOnInit() {
    this.isLoading = true;
    let fetchedUserEmail: string;
    this.authService.userEmail
      .pipe(
        take(1),
        switchMap(userEmail => {
          fetchedUserEmail = userEmail;
          return this.savedcardsService.getMyAccount(fetchedUserEmail);
        })
      )
      .subscribe(
        account => {
          this.account = account;
          // if(this.account != null){
          //   this.createURL(this.account);
          // }          
          // this.isAvailable = account.userEmail !== fetchedUserEmail;
          this.isLoading = false;
        }
      );
  }

  createURL(account: Savedcard){
    if(account.linkedinurl != "" || account.linkedinurl != null){
      this.linkedin = true
    }
    if(account.facebookurl != "" || account.facebookurl != null){
      this.facebook = true
    }
    if(account.instagramurl != "" || account.instagramurl != null){
      this.instagram = true
    }

  }

  onShare() {
    this.alertCtrl
      .create({
        header: 'Send Your Card',
        inputs: [
          {
            name: 'ContactNumber',
            placeholder: 'Contact Number',
            type: 'number'
          }
        ],
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked');
            }
          },
          {
            text: 'Send',
            handler: data => {
              this.onFindingReceiver(data.ContactNumber)
              this.SenderPhone = data.ContactNumber.toString();
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  onFindingReceiver(ContactNumber: number) {
    try {
      this.isLoading = true;
      let fetchedUserEmail: string;
      this.authService.userEmail
        .pipe(
          take(1),
          switchMap(userEmail => {
            fetchedUserEmail = userEmail;
            return this.savedcardsService.getReceiver(ContactNumber);
          })
        )
        .subscribe(
          receiver => {
            this.receiver = receiver;
            this.onSending(this.receiver);
            this.isLoading = false;
          }
        );
    } catch (e) {
      console.log("onSending:: ", e);
    }
  }

  onSending(receiver: Savedcard) {
    try {
      if (receiver != null) {
        this.loadingCtrl
          .create({ message: 'Sending...' })
          .then(loadingEl => {
            loadingEl.present();
            this.sendingService
              .addCard(
                this.account.name,
                this.account.contactnumber,
                this.account.companyname,
                this.account.imageUrl,
                this.account.linkedinurl,
                this.account.facebookurl,
                this.account.instagramurl,
                receiver.userId,
                receiver.name,
                receiver.contactnumber,
                receiver.companyname
              )
              .subscribe(() => {
                loadingEl.dismiss();
              });
          });
        this.ionicToastService.sentCardToast();
        this.ionicToastService.HideToast();
      } else {
        // error => {
        //   this.alertCtrl
        //     .create({
        //       header: 'An error ocurred!',
        //       message: 'Receiver not Found, Check Contact Number',
        //       buttons: [
        //         {
        //           text: 'Okay',
        //           handler: () => {
        //             this.router.navigate(['/savedcards/tabs/profile']);
        //           }
        //         }
        //       ]
        //     })
        //     .then(alertEl => alertEl.present());
        // }
        this.message = "Name: " + this.account.name + ", Phone Number: " + this.account.contactnumber + ", Designation: " + this.account.designation + ", Company Name: " + this.account.companyname + ", Company Website: " + this.account.companywebsite + ", Office Address: " + this.account.officeaddress;
        this.sms.send(this.SenderPhone, this.message);
      }
    } catch (e) {
      console.log("onSending:: ", e);
    }
  }

  async onOpenSocial(urltoopen: string){
    // var ret = await App.canOpenUrl({ url: urltoopen});
    // var retx = await App.openUrl({ url: urltoopen });
    // console.log('Open url response: ', ret);
    window.open(urltoopen,'_blank','location=yes');
  }

  onEdit(updateUserId: string, customer: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    if(customer == "corporate"){
      this.router.navigate(['/', 'savedcards', 'tabs', 'profile', 'editcorporate', updateUserId]);
    }else{
      this.router.navigate(['/', 'savedcards', 'tabs', 'profile', 'edit', updateUserId]);
    }    
    console.log('Editing item', updateUserId);
  }

  ngOnDestroy() {
    if (this.SavedcardsSub) {
      this.SavedcardsSub.unsubscribe();
    }
  }

}
