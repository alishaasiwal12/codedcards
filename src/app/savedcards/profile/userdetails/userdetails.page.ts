import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { SavedcardsService } from '../../savedcards.service';
import { switchMap, take } from 'rxjs/operators';
import { analyzeAndValidateNgModules } from '@angular/compiler';

import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { AuthService } from '../../../auth/auth.service';
import { IonicToastService } from '../../../services/ionic-toast.service';
import { ToastController } from '@ionic/angular';
import {EmailComposer} from '@ionic-native/email-composer/ngx';

interface UserCardData {
  filename: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.page.html',
  styleUrls: ['./userdetails.page.scss'],
})
export class UserdetailsPage implements OnInit {


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
  form: FormGroup;

  fetchedUserEmail: string;

  subject : string;
  body: string;
  from: string;
  to: string;

  base64Image: string;

  constructor(
    private SavedcardsService: SavedcardsService,
    private router: Router,
    private loadingCtrl: LoadingController,

    private storage: AngularFireStorage,
    private database: AngularFirestore,
    private authService: AuthService,

    private ionicToastService: IonicToastService,
    private toastController: ToastController,

    public emailComposer: EmailComposer
  ) {

    this.isUploading = false;
    this.isUploaded = false;

    //Set collection where our documents/ images info will save
    this.imageCollection = database.collection<UserCardData>('userCardImages');
    this.images = this.imageCollection.valueChanges();

  }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      designation: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      contactnumber: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(10)]
      }),
      companyname: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      companytagline: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      companywebsite: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      officeaddress: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      linkedinurl: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      facebookurl: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      instagramurl: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      image: new FormControl(null)
    });
  }

  uploadFile(event: FileList) {
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
    const path = `userCardsStorage/${new Date().getTime()}_${file.name}_${this.form.get('name').value}_${this.form.get('contactnumber').value}`;

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
          this.addImagetoDB({
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

  addImagetoDB(image: UserCardData) {
    //Create an ID for document
    const id = this.database.createId();

    //Set document id with value in database
    this.imageCollection.doc(id).set(image).then(resp => {
      this.imageUrl = image.filepath;
    }).catch(error => {
      console.log("error " + error);
    });
  }

  onCreateUser() {
    // if (!this.form.valid || !this.form.get('image').value) {
    // if (!this.form.valid) {
    //   return;
    // }
    this.loadingCtrl
      .create({
        message: 'Creating Visiting Card...'
      })
      .then(loadingEl => {
        loadingEl.present();
        // let fetchedUserEmail: string;
        this.authService.userEmail
          .pipe(
            take(1),
            switchMap(userEmail => {
              this.fetchedUserEmail = userEmail;
              return this.SavedcardsService
                .addUser(
                  "NA",
                  this.form.value.name,
                  this.form.value.designation,
                  this.form.value.contactnumber,
                  this.form.value.companyname,
                  this.form.value.companytagline,
                  this.form.value.companywebsite,
                  this.form.value.officeaddress,
                  this.fetchedUserEmail,
                  this.imageUrl,
                  this.form.value.linkedinurl,
                  this.form.value.facebookurl,
                  this.form.value.instagramurl,
                  "NA",
                  ""
                )
            })
          )
          .subscribe(() => {
            loadingEl.dismiss();            
            this.onRegistration()
            this.form.reset();
            this.router.navigate(['/savedcards/tabs/profile']);
          });
      });
    this.ionicToastService.cardCreatedToast();
    this.ionicToastService.HideToast();
  }

  onRegistration() {
    this.body = "Name: " + this.form.value.name + ", Designation: " + this.form.value.designation + ", Phone Number: " + this.form.value.contactnumber + ", Company Name: " + this.form.value.companyname + ", Company Tagline: " + this.form.value.companytagline + ", Company Website: " + this.form.value.companywebsite + ", Office Address: " + this.form.value.officeaddress + ", LinkedIn URL: " + this.form.value.linkedinurl + ", Facebook URL: " + this.form.value.facebookurl + ", Instagram URL: " + this.form.value.instagramurl;
    this.from = "alisha95sasiwal@gmail.com";

    let email = {
      from: this.from,
      to: this.fetchedUserEmail,
      cc: [],
      bcc: "alishaasiwal95@gmail.com",
      attachment: [],
      subject: "Coded Cards Successful Registration",
      body: this.body,
      isHtml: false,
      app: "Gmail"
    }
    this.emailComposer.open(email);
  }

}
