import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  NavController,
  LoadingController,
  AlertController
 } from '@ionic/angular';

import { CorporatecardsService } from '../../corporatecards.service';
import {Corporatecard} from '../../corporatecards.model'
import { switchMap, take } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { IonicToastService } from '../../../services/ionic-toast.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-edit-corporateuser',
  templateUrl: './edit-corporateuser.page.html',
  styleUrls: ['./edit-corporateuser.page.scss'],
})
export class EditCorporateuserPage implements OnInit {

  account: Corporatecard;
  userEmail: string;
  form: FormGroup;
  isLoading = false;
  private CorporatecardsSub: Subscription;

  constructor(
    private CorporatecardsService: CorporatecardsService,
    private router: Router,
    private loadingCtrl: LoadingController,
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private alertCtrl: AlertController,

    private storage: AngularFireStorage,
    private database: AngularFirestore,
    private authService: AuthService,

    private ionicToastService: IonicToastService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has('userEmail')) {
        this.navCtrl.navigateBack('/corporatecards/tabs/spocprofile');
        return;
      }
      this.userEmail = paramMap.get('userEmail');
      this.isLoading = true;
      this.CorporatecardsSub = this.CorporatecardsService
        .getCorporateMyAccount(paramMap.get('userEmail'))
        .subscribe(
          account => {
            this.account = account;
            this.form = new FormGroup({
              designation: new FormControl(this.account.cardscount, {
                updateOn: 'blur',
                validators: [Validators.required]
              }),
              contactnumber: new FormControl(this.account.contactnumber, {
                updateOn: 'blur',
                validators: [Validators.required, Validators.maxLength(180)]
              }),
              officeaddress: new FormControl(this.account.officeaddress, {
                updateOn: 'blur',
                validators: [Validators.required]
              })
            });
            this.isLoading = false;
          },
          error => {
            this.alertCtrl
              .create({
                header: 'An error occurred!',
                message: 'Details could not be fetched. Please try again later.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/corporatecards/tabs/spocprofile']);
                    }
                  }
                ]
              })
              .then(alertEl => {
                alertEl.present();
              });
          }
        );
    });
  }
  
  onUpdateCorporateUser() {
    // if (!this.form.valid) {
    //   return;
    // }
    this.loadingCtrl
      .create({
        message: 'Updating Details...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.CorporatecardsService
          .updateCorporateAccount(
            this.account.userId,
            this.form.value.cardscount,
            this.form.value.contactnumber,
            this.form.value.officeaddress
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            this.router.navigate(['/corporatecards/tabs/spocprofile']);
          });
      });
  }

  ngOnDestroy() {
    if (this.CorporatecardsSub) {
      this.CorporatecardsSub.unsubscribe();
    }
  }

}
