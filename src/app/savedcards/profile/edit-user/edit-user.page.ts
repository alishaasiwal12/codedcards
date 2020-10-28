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
import { switchMap, take } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, Subscription } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { IonicToastService } from '../../../services/ionic-toast.service';
import { ToastController } from '@ionic/angular';

interface UserCardData {
  filename: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.page.html',
  styleUrls: ['./edit-user.page.scss'],
})
export class EditUserPage implements OnInit {

  account: Savedcard;
  userEmail: string;
  form: FormGroup;
  isLoading = false;
  private SavedcardsSub: Subscription;

    // Upload Task 
    task: AngularFireUploadTask;

    // Progress in percentage
    percentage: Observable<number>;
  
    // Snapshot of uploading file
    snapshot: Observable<any>;
  
    // Uploaded File URL
    UploadedFileURL: Observable<string>;
  
    //Uploaded Image List
    images: Observable<UserCardData[]>;
  
    //File details  
    fileName: string;
    fileSize: number;
  
    //Status check 
    isUploading: boolean;
    isUploaded: boolean;
  
    private imageCollection: AngularFirestoreCollection<UserCardData>;
    public imageUrl: string
  
    public disabled = true;
  
    base64Image: string;

  constructor(
    private SavedcardsService: SavedcardsService,
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
  ) {
    this.isUploading = false;
    this.isUploaded = false;

    //Set collection where our documents/ images info will save
    this.imageCollection = database.collection<UserCardData>('userCardImages');
    this.images = this.imageCollection.valueChanges();
   }

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
              }),
              image: new FormControl(null)
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

  uploadUpdatedFile(event: FileList) {
    // The File object
    const file = event.item(0)

    // Validation for Images Only
    if (file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }

    this.isUploading = true;
    this.isUploaded = false;

    this.fileName = file.name;

    // The storage path
    const path = `userCardsStorage/${file.name}_${this.account.name}_${this.form.get('contactnumber').value}`;

    // Totally optional metadata
    const customMetadata = { app: 'User Cards Image Upload' };

    //File reference
    const fileRef = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, file, { customMetadata });

    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(

      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = fileRef.getDownloadURL();

        this.UploadedFileURL.subscribe(resp => {
          this.addUpdatedImagetoDB({
            filename: file.name,
            filepath: resp,
            size: this.fileSize
          });
          this.isUploading = false;
          this.isUploaded = true;
        }, error => {
          console.error(error);
        })
      }),
      tap(snap => {
        this.fileSize = snap.totalBytes;
      })
    )
  }

  addUpdatedImagetoDB(image: UserCardData) {
    //Create an ID for document
    const id = this.database.createId();

    //Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      this.imageUrl = image.filepath;
    }).catch(error => {
      console.log("error " + error);
    });
  }

  onUpdateUser() {
    // if (!this.form.valid) {
    //   return;
    // }
    this.loadingCtrl
      .create({
        message: 'Updating Visiting Card...'
      })
      .then(loadingEl => {
        loadingEl.present();
        this.SavedcardsService
          .updateAccount(
            this.account.userId,
            this.form.value.designation,
            this.form.value.contactnumber,
            this.form.value.officeaddress,
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
