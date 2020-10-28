// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  production: false,
  firebase: {
    firebaseAPIKey: "AIzaSyDsnH6MtQ46n-PKAuNPrw-FU3osJNl1nhA",
    authDomain: "codedcards.firebaseapp.com",
    databaseURL: "https://codedcards.firebaseio.com",
    projectId: "codedcards",
    storageBucket: "codedcards.appspot.com",
    messagingSenderId: "346466379679",
    appId: "1:346466379679:android:c4e17a7cb72f9db185ffaa",
    measurementId: ""
  }

};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
