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

import { CorporatecardsService } from '../corporatecards.service';
import { Corporatecard } from '../corporatecards.model';
import { AuthService } from '../../auth/auth.service';
import { IonicToastService } from '../../services/ionic-toast.service';
import { ToastController } from '@ionic/angular';
import { Contacts, Contact, ContactName, ContactField } from '@ionic-native/contacts/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

import { Plugins, AppState } from '@capacitor/core';

const { App } = Plugins;

@Component({
  selector: 'app-spocprofile',
  templateUrl: './spocprofile.page.html',
  styleUrls: ['./spocprofile.page.scss'],
})
export class SpocprofilePage implements OnInit {
  smsText: string;
  message: string;
  SenderPhone: string;
  account: Corporatecard;
  receiver: Corporatecard;
  Email4Form: string;
  isAvailable = false;
  isExists = false;
  form: FormGroup;
  isLoading = false;
  private SavedcardsSub: Subscription;
  public notifications: any;
  public isSubscribed: boolean;
  private TOPIC_NAME = 'homeTopic';

  subject : string;
  body: string;
  from: string;
  to: string;

  constructor(
    private ionicToastService: IonicToastService,
    private toastController: ToastController,
    private corporatecardsService: CorporatecardsService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router,
    public emailComposer: EmailComposer
  ) { this.isSubscribed = false; }

  ngOnInit() {
    this.isLoading = true;
    let fetchedUserEmail: string;
    this.authService.userEmail
      .pipe(
        take(1),
        switchMap(userEmail => {
          fetchedUserEmail = userEmail;
          return this.corporatecardsService.getCorporateMyAccount(fetchedUserEmail);
        })
      )
      .subscribe(
        account => {
          this.account = account;  
          // this.isAvailable = account.userEmail !== fetchedUserEmail;
          this.isLoading = false;
        }
      );
  }

  onEmployeeForm() {
    this.alertCtrl
      .create({
        header: 'Receive Form ',
        inputs: [
          {
            name: 'Email4Form',
            placeholder: 'Enter E-mail Id',
            type: 'email'
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
              this.onSendEmailForm(data.Email4Form)
            }
          }
        ]
      })
      .then(alertEl => {
        alertEl.present();
      });
  }

  onSendEmailForm(Email4Form: string) {
    // this.body = "SPOC Name: " + this.form.value.name + ",SPOC Email-ID: " + this.form.value.emailid + ", Cards Count: " + this.form.value.cardscount + ", Phone Number: " + this.form.value.contactnumber + ", Company Name: " + this.form.value.companyname + ", Company Tagline: " + this.form.value.companytagline + ", Company Website: " + this.form.value.companywebsite + ", Office Address: " + this.form.value.officeaddress;
    this.body = "Kindly fill the enclosed form and upload in Coded Cards for Step 2"
    this.from = "alisha95sasiwal@gmail.com";

    let email = {
      from: this.from,
      to: Email4Form,
      cc: [],
      bcc: "alishaasiwal95@gmail.com",
      attachment: [
        'file:../../../assets/documents/Corporate_List.xlsx'
      ],
      subject: "Coded Cards - Employee's Visiting Cards Creation Form",
      body: this.body,
      isHtml: false,
      app: "Gmail"
    }
    this.emailComposer.open(email);
  }

  onEdit(updateUserId: string, slidingItem: IonItemSliding) {
    slidingItem.close();
    this.router.navigate(['/', 'corporatecards', 'tabs', 'spocprofile', 'edit', updateUserId]);
    console.log('Editing item', updateUserId);
  }

  ngOnDestroy() {
    if (this.SavedcardsSub) {
      this.SavedcardsSub.unsubscribe();
    }
  }


}
