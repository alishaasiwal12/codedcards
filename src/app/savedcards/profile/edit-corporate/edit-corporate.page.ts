import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { 
  NavController,
  LoadingController,
  AlertController
 } from '@ionic/angular';

import { SavedcardsService } from '../../savedcards.service';
import {Savedcard} from '../../savedcards.model'
import { EditrequestService } from './editrequest.service';
import { Editrequest } from './editcorporate.model';
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
  selector: 'app-edit-corporate',
  templateUrl: './edit-corporate.page.html',
  styleUrls: ['./edit-corporate.page.scss'],
})
export class EditCorporatePage implements OnInit {

  account: Savedcard;
  userEmail: string;
  form: FormGroup;
  isLoading = false;
  private SavedcardsSub: Subscription;

  public disabled = true;

  constructor(
    private SavedcardsService: SavedcardsService,
    private EditrequestService: EditrequestService,
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
        this.navCtrl.navigateBack('/savedcards/tabs/profile');
        return;
      }
      this.userEmail = paramMap.get('userEmail');
      this.isLoading = true;
      this.SavedcardsSub = this.SavedcardsService
        .getMyAccount(paramMap.get('userEmail'))
        .subscribe(
          account => {
            this.account = account;
            this.form = new FormGroup({
              designation: new FormControl(this.account.designation, {
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
                message: 'User Details could not be fetched. Please try again later.',
                buttons: [
                  {
                    text: 'Okay',
                    handler: () => {
                      this.router.navigate(['/savedcards/tabs/profile']);
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

  onEditRequest() {
    // if (!this.form.valid) {
    //   return;
    // }
    this.loadingCtrl
      .create({
        message: 'Requesting for Update...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.EditrequestService
          .addEditRequest(
            this.account.name,            
            this.form.value.designation,
            this.form.value.contactnumber,
            this.form.value.officeaddress,
            this.account.designation,
            this.account.contactnumber,
            this.account.officeaddress,
            this.account.userId,
            this.account.userEmail
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
