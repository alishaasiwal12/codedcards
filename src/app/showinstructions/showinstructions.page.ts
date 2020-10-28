import { Component, OnInit, ViewChild } from '@angular/core';
import { IonSlides } from '@ionic/angular';

@Component({
  selector: 'app-showinstructions',
  templateUrl: './showinstructions.page.html',
  styleUrls: ['./showinstructions.page.scss'],
})
export class ShowinstructionsPage implements OnInit {
  @ViewChild('slideWithNav', { static: false }) slideWithNav: IonSlides;

  sliderOne: any;

  //Configuration for each Slider
  slideOptsOne = {
    initialSlide: 0,
    slidesPerView: 1,
    autoplay: true
  };

  constructor(
  ) {
    //Item object for Nature
    this.sliderOne =
    {
      isBeginningSlide: true,
      isEndSlide: false,
      slidesItems: [
        {
          url: "../../assets/images/instructions/welcome.PNG",
          id: "Welcome"
        },
        {
          url: "../../assets/images/instructions/about.png",
          id: "About"
        },
        {
          url: "../../assets/images/instructions/switch.png",
          id: "Switch"
        },
        {
          url: "../../assets/images/instructions/sharing.png",
          id: "Sharing"
        },
        {
          url: "../../assets/images/instructions/features.png",
          id: "Features"
        },
        {
          url: "../../assets/images/instructions/signup.png",
          id: "Sign Up"
        },
        {
          url: "../../assets/images/instructions/finance.png",
          id: "Finance"
        }
      ]
    };
  }

  ngOnInit() {
  }

  //Method called when slide is changed by drag or navigation
  SlideDidChange(object, slideView) {
    this.checkIfNavDisabled(object, slideView);
  }

  //Call methods to check if slide is first or last to enable disbale navigation  
  checkIfNavDisabled(object, slideView) {
    this.checkisBeginning(object, slideView);
    this.checkisEnd(object, slideView);
  }

  checkisBeginning(object, slideView) {
    slideView.isBeginning().then((istrue) => {
      object.isBeginningSlide = istrue;
    });
  }
  checkisEnd(object, slideView) {
    slideView.isEnd().then((istrue) => {
      object.isEndSlide = istrue;
    });
  }

}
