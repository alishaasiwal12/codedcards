import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HTTP } from '@ionic-native/http/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import * as firebase from 'firebase';

import { Firebase } from '@ionic-native/firebase/ngx';

import {IonicToastService} from './services/ionic-toast.service';
import { AppRate } from '@ionic-native/app-rate/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {Contacts} from '@ionic-native/contacts/ngx';
import {CallNumber} from '@ionic-native/call-number/ngx';
import {SMS} from '@ionic-native/sms/ngx';

import { PapaParseModule } from 'ngx-papaparse';
import { Papa } from 'ngx-papaparse';
import { File } from '@ionic-native/file/ngx';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    HttpClientModule, 
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireAuthModule,    
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  providers: [
    StatusBar,    
    SplashScreen,
    Firebase,
    AppRate,
    Contacts,
    CallNumber,
    SMS,
    EmailComposer,
    IonicToastService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    HTTP,
    PapaParseModule,
    Papa,
    File,
    // SocialSharing,    
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
