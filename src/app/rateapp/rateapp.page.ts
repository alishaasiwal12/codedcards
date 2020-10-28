import { Component, OnInit } from '@angular/core';
import { AppRate } from '@ionic-native/app-rate/ngx';

@Component({
  selector: 'app-rateapp',
  templateUrl: './rateapp.page.html',
  styleUrls: ['./rateapp.page.scss'],
})
export class RateappPage implements OnInit {

  constructor(private appRate: AppRate) { }

  ngOnInit() {
    // this.appRate.preferences.storeAppURL = {
    //   ios: '< my_app_id >',
    //   // android: 'market://details?id=< package_name >',
    //   android: 'market://details?id=< com.entrepreneur.codedcards >',
    //   windows: 'ms-windows-store://review/?ProductId=< Store_ID >'
    //   };
  
    //   this.appRate.promptForRating(true); 
  }

  rateMe(){
    // this.appRate.preferences.storeAppURL = {
    // ios: '< my_app_id >',
    // // android: 'market://details?id=< package_name >',
    // android: 'market://details?id=< com.entrepreneur.codedcards >',
    // windows: 'ms-windows-store://review/?ProductId=< Store_ID >'
    // };

    // this.appRate.promptForRating(true); 


    // or, override the whole preferences object
this.appRate.preferences = {
  usesUntilPrompt: 3,
  storeAppURL: {
  //  ios: '<app_id>',
   android: 'market://details?id=<com.entrepreneur.codedcards>'
  //  windows: 'ms-windows-store://review/?ProductId=<store_id>'
  }
}

this.appRate.promptForRating(false);
}

}
