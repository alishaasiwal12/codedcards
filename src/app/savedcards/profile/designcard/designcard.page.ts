import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  LoadingController,
  AlertController
} from '@ionic/angular';
import { Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

import { SavedcardsService } from '../../savedcards.service';
import { AuthService } from '../../../auth/auth.service';
import { Savedcard } from '../../savedcards.model';

import html2canvas from 'html2canvas';

@Component({
  selector: 'app-designcard',
  templateUrl: './designcard.page.html',
  styleUrls: ['./designcard.page.scss'],
})
export class DesigncardPage implements OnInit, OnDestroy {
  account: Savedcard;
  form: FormGroup;
  isLoading = false;
  templateUrl: string;
  private SavedcardsSub: Subscription;
  public isSubscribed: boolean;
  public imageUrl: string
  

  tempAr = ['card_template1.jpg', 'card_template2.jpg', 'card_template3.jpg', 'card_template4.jpg', 'card_template5.jpg', 'card_template6.jpg', 'card_template7.png', 'card_template8.jpg', 'card_template9.jpg', 'card_template10.jpg'];
  path = "../../../../assets/images/card_template";

  constructor(
    private savedcardsService: SavedcardsService,
    private loadingCtrl: LoadingController,
    private authService: AuthService,
    private alertCtrl: AlertController,
    private router: Router
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
          this.onCreatingTempate(this.account);     
          this.isLoading = false;
        }
      );
  }

  onCreatingTempate(account: Savedcard){
    try{
      if(account.templatetype == "cardtemplate1"){
        this.templateUrl = '<img src="' + this.path + this.tempAr[0] + '" alt = "">';
        // this.templateUrl = "../../../../assets/images/card_template/card_template1.jpg";
      }
      else if(account.templatetype == "cardtemplate2"){
        this.templateUrl = '<img src="' + this.path + this.tempAr[1] + '" alt = "">';
        // this.templateUrl = "../../../../assets/images/card_template/card_template2.jpg";
      }
      else if(account.templatetype == "cardtemplate3"){
        this.templateUrl = '<img src="' + this.path + this.tempAr[2] + '" alt = "">';
        // this.templateUrl = "../../../../assets/images/card_template/card_template3.jpg";
      }
      else if(account.templatetype == "cardtemplate4"){
        this.templateUrl = '<img src="' + this.path + this.tempAr[3] + '" alt = "">';
        // this.templateUrl = "../../../../assets/images/card_template/card_template4.jpg";
      }
      else if(account.templatetype == "cardtemplate5"){
        this.templateUrl = '<img src="' + this.path + this.tempAr[4] + '" alt = "">';
        // this.templateUrl = "../../../../assets/images/card_template/card_template5.jpg";
      }
      else if(account.templatetype == "cardtemplate6"){
        this.templateUrl = '<img src="' + this.path + this.tempAr[5] + '" alt = "">';
        // this.templateUrl = "../../../../assets/images/card_template/card_template6.jpg";
      }
      else if(account.templatetype == "cardtemplate7"){
        this.templateUrl = '<img src="' + this.path + this.tempAr[6] + '" alt = "">';
        // this.templateUrl = "../../../../assets/images/card_template/card_template7.jpg";
      }
      else if(account.templatetype == "cardtemplate8"){
        this.templateUrl = '<img src="' + this.path + this.tempAr[7] + '" alt = "">';
        // this.templateUrl = "../../../../assets/images/card_template/card_template8.jpg";
      }
      else if(account.templatetype == "cardtemplate9"){
        this.templateUrl = '<img src="' + this.path + this.tempAr[8] + '" alt = "">';
        // this.templateUrl = "../../../../assets/images/card_template/card_template9.jpg";
      }
      else if(account.templatetype == "cardtemplate10"){
        this.templateUrl = '<img src="' + this.path + this.tempAr[9] + '" alt = "">';
        // this.templateUrl = "../../../../assets/images/card_template/card_template10.jpg";
      }
    } catch (e) {
      console.log("onCreatingTempate:: ", e);
    }
  }

  getCard(){
    console.log("Get Template URL:: ", this.templateUrl)
    document.write(this.templateUrl); document.close();
  }

  createImage() {
    //var container = document.getElementById("image-wrap"); //specific element on page
    var container = document.getElementById("cont");; // full page 
    html2canvas(container, { allowTaint: true }).then(function (canvas) {
      var link = document.createElement("a");
      document.body.appendChild(link);
      link.download = "visitingcard.jpg";
      link.href = canvas.toDataURL();
      link.target = '_blank';
      link.click();
      const imageData = canvas.toDataURL('image/png') ;
      this.imageUrl = imageData;
    });
    this.onUpdateCard();
  }

  onUpdateCard() {
    // if (!this.form.valid) {
    //   return;
    // }
    this.loadingCtrl
      .create({
        message: 'Uploading Visiting Card...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.savedcardsService
          .updateAccount(
            this.account.userId,
            this.account.designation,
            this.account.contactnumber,
            this.account.officeaddress,
            this.imageUrl
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/savedcards/tabs/profile']);
          });
      });
  }
  
  ngOnDestroy() {
    if (this.SavedcardsSub) {
      this.SavedcardsSub.unsubscribe();
    }
  }

}
