import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

import { CorporatecardsService } from '../../corporatecards.service';
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

interface CorporateLogoData {
  filename: string;
  filepath: string;
  size: number;
}

interface EmployeeFormData {
  formfilename: string;
  formfilepath: string;
  formsize: number;
}

@Component({
  selector: 'app-customcorporate',
  templateUrl: './customcorporate.page.html',
  styleUrls: ['./customcorporate.page.scss'],
})
export class CustomcorporatePage implements OnInit {

      // Upload Task 
      task: AngularFireUploadTask;

      // Progress in percentage
      percentage: Observable<number>;
    
      // Snapshot of uploading file
      snapshot: Observable<any>;
    
      // Uploaded File URL
      UploadedFileURL: Observable<string>;
     
      //Uploaded Image List
      logos: Observable<CorporateLogoData[]>;
    
      //File details  
      fileName: string;
      fileSize: number;
      fileRef;
      file;
  
      //Status check 
      isUploading: boolean;
      isUploaded: boolean;
     
      private logoCollection: AngularFirestoreCollection<CorporateLogoData>;
      public logoUrl: string
    
      public disabled = true;    
      form: FormGroup;
  
      fetchedUserEmail: string;
      public templatetype: string;
      subject : string;
      body: string;
      from: string;
      to: string;
    
      base64Image: string;

        // Upload Form Task 
  taskForm: AngularFireUploadTask;

  // Progress in percentage
  percentageForm: Observable<number>;

  // Snapshot of uploading file
  snapshotForm: Observable<any>;

  // Uploaded File URL
  UploadedFileFormURL: Observable<string>;

  //Uploaded Image List
  forms: Observable<EmployeeFormData[]>;

  //File details  
  fileFormName: string;
  fileFormSize: number;
  fileFormRef;
  fileForm;

  //Status check 
  isFormUploading: boolean;
  isFormUploaded: boolean;

  private formCollection: AngularFirestoreCollection<EmployeeFormData>;
  public formUrl: string
  
    constructor(
      private CorporatecardsService: CorporatecardsService,
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
      this.logoCollection = database.collection<CorporateLogoData>('corporateLogoImages');
      this.logos = this.logoCollection.valueChanges();

      this.isFormUploading = false;
      this.isFormUploaded = false;
  
      //Set collection where our documents info will save
      this.formCollection = database.collection<EmployeeFormData>('employeeForms');
      this.forms = this.formCollection.valueChanges();
    }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      emailid: new FormControl(null, {
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
      cardscount: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      templatetype: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      logo: new FormControl(null)
    });
  }

  templateTypeHandler(event) {
    // get data throught event emitter
    this.templatetype = event.target.value;
  }
  leaveTemplateType(event) {
    console.log('bye bye Template', event.target.value);
  }
  goTemplateType(event) {
    console.log('Hello Template', event.target.value);
  }

  uploadLogoFile(event: FileList) {
    // The File object
    this.file = event.item(0)

    // Validation for Images Only
    if (this.file.type.split('/')[0] !== 'image') {
      console.error('unsupported file type :( ')
      return;
    }
 
    this.isUploading = true;
    this.isUploaded = false;

    this.fileName = this.file.name;

    // The storage path
    const path = `corporateLogoStorage/${new Date().getTime()}_${this.form.get('name').value}_${this.form.get('contactnumber').value}_${this.file.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Corporate Logo Image Upload' };

    //File reference
    this.fileRef = this.storage.ref(path);

    // The main task
    this.task = this.storage.upload(path, this.file, { customMetadata });

    // Get file progress percentage
    this.percentage = this.task.percentageChanges();
    this.snapshot = this.task.snapshotChanges().pipe(

      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileURL = this.fileRef.getDownloadURL();

        this.UploadedFileURL.subscribe(resp => {
          this.addLogotoDB({
            filename: this.file.name,
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

  addLogotoDB(logo: CorporateLogoData) {
    //Create an ID for document
    const id = this.database.createId();

    //Set document id with value in database
    this.logoCollection.doc(id).set(logo).then(resp => {
      this.logoUrl = logo.filepath;
    }).catch(error => {
      console.log("error " + error);
    });
  }

  uploadEmployeeForm(event: FileList) {
    // The File object
    this.fileForm = event.item(0)
    console.log("File:: ",this.fileForm);

    // // Validation for Images Only
    // if (file.type.split('/')[0] !== 'image') {
    //   console.error('unsupported file type :( ')
    //   return;
    // }

    this.isFormUploading = true;
    this.isFormUploaded = false;

    this.fileFormName = this.fileForm.name;

    // The storage path
    const path = `employeeFormsStorage/${new Date().getTime()}_${this.form.get('companyname').value}_${this.form.get('contactnumber').value}_${this.fileForm.name}`;

    // Totally optional metadata
    const customMetadata = { app: 'Employee Card Creation Upload' };

    //File reference
    this.fileFormRef = this.storage.ref(path);

    // The main task
    this.taskForm = this.storage.upload(path, this.fileForm, { customMetadata });

    // Get file progress percentage
    this.percentageForm = this.taskForm.percentageChanges();
    this.snapshotForm = this.taskForm.snapshotChanges().pipe(

      finalize(() => {
        // Get uploaded file storage path
        this.UploadedFileFormURL = this.fileFormRef.getDownloadURL();

        this.UploadedFileFormURL.subscribe(resp => {
          this.addFormtoDB({
            formfilename: this.fileForm.name,
            formfilepath: resp,
            formsize: this.fileFormSize
          });
          this.isFormUploading = false;
          this.isFormUploaded = true;
        }, error => {
          console.error(error);
        })
      }),
      tap(snap => {
        this.fileFormSize = snap.totalBytes;
      })
    )
  }

  addFormtoDB(files: EmployeeFormData) {
    //Create an ID for document
    const id = this.database.createId();

    //Set document id with value in database
    this.formCollection.doc(id).set(files).then(resp => {
      this.formUrl = files.formfilepath;
    }).catch(error => {
      console.log("error " + error);
    });
  }

  onCreateCustomCorporate() {
    // if (!this.form.valid || !this.form.get('image').value) {
    // if (!this.form.valid) {
    //   return;
    // }
    this.loadingCtrl
      .create({
        message: 'Submitting...'
      })
      .then(loadingEl => {
        loadingEl.present();
        // let fetchedUserEmail: string;
        this.authService.userEmail
          .pipe(
            take(1),
            switchMap(userEmail => {
              this.fetchedUserEmail = userEmail;
              return this.CorporatecardsService
                .addCorporateUser(
                  this.templatetype,
                  this.form.value.name,
                  this.form.value.emailid,
                  this.form.value.contactnumber,
                  this.form.value.companyname,
                  this.form.value.companytagline,
                  this.form.value.companywebsite,
                  this.form.value.officeaddress,
                  this.form.value.cardscount,
                  this.fetchedUserEmail,
                  this.formUrl,
                  false,
                  "",
                  this.logoUrl
                )
            })
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.onRegistration()
            this.form.reset();
            this.router.navigate(['/corporatecards/tabs/spocprofile']);
          });
      });
    this.ionicToastService.corporateAdminCreatedToast();
    this.ionicToastService.HideToast();
  }

  onRegistration() {
      this.body = "SPOC Name: " + this.form.value.name + ",SPOC Email-ID: " + this.form.value.emailid + ", Cards Count: " + this.form.value.cardscount + ", Phone Number: " + this.form.value.contactnumber + ", Company Name: " + this.form.value.companyname + ", Company Tagline: " + this.form.value.companytagline + ", Company Website: " + this.form.value.companywebsite + ", Office Address: " + this.form.value.officeaddress;
      this.from = "alisha95sasiwal@gmail.com";

    let email = {
      from: this.from,
      to: this.fetchedUserEmail,
      cc: [],
      bcc: "alishaasiwal95@gmail.com",
      attachment: [],
      subject: "Request raised Successfully - Coded Cards",
      body: this.body,
      isHtml: false,
      app: "Gmail"
    }
    this.emailComposer.open(email);
  }

}
