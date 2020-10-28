import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing';

@Component({
  selector: 'app-shareapp',
  templateUrl: './shareapp.page.html',
  styleUrls: ['./shareapp.page.scss'],
})
export class ShareappPage implements OnInit {

  public sendTo   : any; 
  public subject  : string = 'Message from Coded Cards App';
  public message  : string = 'Download this business cards application: Coded Cards - ';
  public image    : string	= 'http://masteringionic2.com/perch/resources/mastering-ionic-2-cover-1-w320.png';
  public uri      : string	= 'https://drive.google.com/file/d/14LQ93sD1T65T8DQzkIb1hQ3sDE5RxAPb/view?usp=sharing';

  constructor( public navCtrl    : NavController,
               public platform   : Platform) 
  { }

  ngOnInit() {
    this.sharePicker();
  }

  shareViaEmail()
   {
      this.platform.ready()
      .then(() => 
      {
         SocialSharing.canShareViaEmail()
         .then(() => 
         {
            SocialSharing.shareViaEmail(this.message, this.subject, this.sendTo)
            .then((data) =>
            {
               console.log('Shared via Email');
            })
            .catch((err) =>
            {
               console.log('Not able to be shared via Email');
            });
         })
         .catch((err) =>
         {
            console.log('Sharing via Email NOT enabled');
         });
      });
   }
  	


   shareViaFacebook()
   {
      this.platform.ready()
      .then(() => 
      {
         SocialSharing.canShareVia('com.apple.social.facebook', this.message, this.image, this.uri)
         .then((data) =>
         {

            SocialSharing.shareViaFacebook(this.message, this.image, this.uri)
            .then((data) =>
            {
               console.log('Shared via Facebook');
            })
            .catch((err) =>
            {
               console.log('Was not shared via Facebook');
            });

         })
         .catch((err) =>
         {
            console.log('Not able to be shared via Facebook');
         });

      });
   }

   shareViaInstagram()
   {
      this.platform.ready()
      .then(() => 
      {
		
         SocialSharing.shareViaInstagram(this.message, this.image)
         .then((data) =>
         {	
            console.log('Shared via shareViaInstagram');
         })
         .catch((err) =>
         {
            console.log('Was not shared via Instagram');
         });

      });
   }

   shareViaTwitter()
   {
      this.platform.ready()
      .then(() => 
      {
         SocialSharing.canShareVia('com.apple.social.twitter', this.message, this.image, this.uri)
         .then((data) =>
         {

            SocialSharing.shareViaTwitter(this.message, this.image, this.uri)
            .then((data) =>
            {
               console.log('Shared via Twitter');
            })
            .catch((err) =>
            {
               console.log('Was not shared via Twitter');
            });

         });

      })
      .catch((err) =>
      {
         console.log('Not able to be shared via Twitter');
      });
   }

   sharePicker()
   {
      // if (this.platform.is('cordova')) {
         this.platform.ready()
         .then(() => 
         {		  		
            SocialSharing.share(this.message, this.subject, this.image, this.uri)
            .then((data) =>
            {
               console.log('Shared via SharePicker');
            })
            .catch((err) =>
            {
               console.log('Was not shared via SharePicker');
            });
   
         });
      // }else{
      //    this.platform.ready().then(() => {
      //       if(window.plugins.socialsharing) {
      //           window.plugins.socialsharing.share(this.message, this.subject, this.image, this.uri);
      //       }
      //   });
      // }
   }


//   shareImg() { 
//    let imageName = "../../assets/images/appicon.png";
//    const ROOT_DIRECTORY = 'file:///sdcard//';
//    const downloadFolderName = 'tempCodedCardsFolder';
//    this.socialSharing.shareapp()
//            //Common sharing event will open all available application to share
//            this.socialSharing.share("Message","Subject", ROOT_DIRECTORY + downloadFolderName + "/" + imageName, imageName)
//              .then((entries) => {
//                console.log('success ' + JSON.stringify(entries));
//              })
//              .catch((error) => {
//                alert('error ' + JSON.stringify(error));

//  }


}
