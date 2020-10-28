import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Corporatecard } from './corporatecards.model';
import { AuthService } from '../auth/auth.service';

interface CorporatecardData {
  templatetype: string,
  name: string,
  emailid: string,
  contactnumber: number,
  companyname: string,
  companytagline: string,
  companywebsite: string,
  officeaddress: string,
  cardscount: number,
  userId: string,
  userEmail: string,
  excelreceived: string,
  cardscreated: boolean,
  imageUrl: string,
  logoUrl: string
}

interface CorporateUserCardData {
  filename: string;
  filepath: string;
  size: number;
}

interface CorporateUserLogoData {
  filename: string;
  filepath: string;
  size: number;
}

interface EmployeeFormData {
  formfilename: string;
  formfilepath: string;
  formsize: number;
}

@Injectable({
  providedIn: 'root'
})

export class CorporatecardsService {

  private _corporatecards = new BehaviorSubject<Corporatecard[]>([]);

  get corporatecards() {
    return this._corporatecards.asObservable();
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  addCorporateUser(  
    templatetype: string,
    name: string,
    emailid: string,
    contactnumber: number,
    companyname: string,
    companytagline: string,
    companywebsite: string,
    officeaddress: string,
    cardscount: number,
    fetchedUserEmail: string,
    excelreceived: string,
    cardscreated: boolean,
    imageUrl: string,
    logoUrl: string
  ) {
    let generatedId: string;
    let fetchedUserId: string;
    let newCorporatecard: Corporatecard;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      switchMap(token => {
        if (!fetchedUserId) {
          throw new Error('No user found!');
        }
        newCorporatecard = new Corporatecard(
          Math.random().toString(),
          templatetype,
          name,
          emailid,
          contactnumber,
          companyname,
          companytagline,
          companywebsite,
          officeaddress,
          cardscount,
          fetchedUserId,
          fetchedUserEmail,
          excelreceived,
          cardscreated,
          imageUrl,
          logoUrl
        );
        return this.http.post<{ name: string }>(
          `https://codedcards.firebaseio.com/corporateadmin.json?auth=${token}`,
          {
            ...newCorporatecard,
            id: null
          },
          {
            headers: new HttpHeaders(
              {
                "Content-Type": "application/json"
              })
          }
        );

      }),
      switchMap(resData => {
        generatedId = resData.name;
        return this.corporatecards;
      })
    );
  }

  getCorporateMyAccount(fetchedUserEmail: string) {
    let fetchedUserId: string;
    return this.authService.token.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      switchMap(token => {
        return this.http.get<CorporatecardData>(
          `https://codedcards.firebaseio.com/corporateadmin.json?auth=${token}`
        );
      }),
      map(corporatecardData => {
        if (corporatecardData != null || corporatecardData != undefined) {
          for (var key in corporatecardData) {
            if (!corporatecardData.hasOwnProperty(key)) continue;
            var output = corporatecardData[key].userEmail;
            if (output == fetchedUserEmail) {
                var response = corporatecardData[key];
                return new Corporatecard(
                  fetchedUserEmail,
                  response.templatetype,
                  response.name,
                  response.emailid,
                  response.contactnumber,
                  response.companyname,
                  response.companytagline,
                  response.companywebsite,
                  response.officeaddress,
                  response.cardscount,
                  response.userId,
                  response.userEmail,
                  response.excelreceived,
                  response.cardscreated,
                  response.imageUrl,
                  response.logoUrl
  
                );
            }
          }
        } else {
          return null;
        }

      })
    );
  }

  getCorporateReceiver(receiverContactNumber: number) {
    let fetchedUserEmail: string;
    return this.authService.token.pipe(
      take(1),
      switchMap(email => {
        fetchedUserEmail = email;
        return this.authService.token;
      }),
      switchMap(token => {
        return this.http.get<CorporatecardData>(
          `https://codedcards.firebaseio.com/customers.json?auth=${token}`
        );
      }),
      map(corporatecardData => {
        if (corporatecardData != null || corporatecardData != undefined) {
          for (var key in corporatecardData) {
            if (!corporatecardData.hasOwnProperty(key)) continue;
            var output = corporatecardData[key].contactnumber;
            if (output == receiverContactNumber) {
              var response = corporatecardData[key];
              return new Corporatecard(
                fetchedUserEmail,
                response.templatetype,
                response.name,
                response.emailid,
                response.contactnumber,
                response.companyname,
                response.companytagline,
                response.companywebsite,
                response.officeaddress,
                response.cardscount,
                response.userId,
                response.userEmail,
                response.excelreceived,
                response.cardscreated,
                response.imageUrl,
                response.logoUrl
              );
            }
          }
        } else {
          return null;
        }
      })
    );
  }

  fetchCorporateUsers() {
    let fetchedUserEmail: string;
    return this.authService.token.pipe(
      take(1),
      switchMap(email => {
        fetchedUserEmail = email;
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        return this.http.get<{ [key: string]: CorporatecardData }>(
          `https://codedcards.firebaseio.com/customers.json?auth=${token}`
        );
      }),
      map(savedcardData => {
        const savedcards = [];
        if (savedcardData != null || savedcardData != undefined) {
          for (var key in savedcardData) {
            if (savedcardData.hasOwnProperty(key)) {
              var response = savedcardData[key];
              var output = response.userEmail;
              if (output == fetchedUserEmail) {
                savedcards.push(
                  new Corporatecard(
                    fetchedUserEmail,
                    response.templatetype,
                    response.name,
                    response.emailid,
                    response.contactnumber,
                    response.companyname,
                    response.companytagline,
                    response.companywebsite,
                    response.officeaddress,
                    response.cardscount,
                    response.userId,
                    response.userEmail,
                    response.excelreceived,
                    response.cardscreated,
                    response.imageUrl,
                    response.logoUrl
                  )
                );
              }
            }
          }
          return savedcards;
        } else {
          return null;
        }
      })
    );
  }

  updateCorporateAccount(userId: string, cardscount: number, contactnumber: number, officeaddress: string) {
    let updatedCorporatecard: Corporatecard[];
    let fetchedToken: string;
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        fetchedToken = token;
        return this.corporatecards;
      }),
      take(1),
      switchMap(corporatecards => {
        if (!corporatecards || corporatecards.length <= 0) {
          return this.fetchCorporateUsers();
        } else {
          return of(corporatecards);
        }
      }),
      switchMap(corporatecards => {
        const updatedCorporatecardIndex = corporatecards.findIndex(user => user.id === userId);
        updatedCorporatecard = [...corporatecards];
        const oldSavedcard = updatedCorporatecard[updatedCorporatecardIndex];
        updatedCorporatecard[updatedCorporatecardIndex] = new Corporatecard(
          oldSavedcard.id,
          oldSavedcard.templatetype,
          oldSavedcard.name,    
          oldSavedcard.emailid,      
          contactnumber,
          oldSavedcard.companyname,
          oldSavedcard.companytagline,
          oldSavedcard.companywebsite,
          officeaddress,
          cardscount,
          oldSavedcard.userId,
          oldSavedcard.userEmail,
          oldSavedcard.excelreceived,
          oldSavedcard.cardscreated,
          oldSavedcard.imageUrl,
          oldSavedcard.logoUrl
        );
        return this.http.put(
          `https://codedcards.firebaseio.com/corporateadmin/${userId}.json?auth=${fetchedToken}`,
          { ...updatedCorporatecard[updatedCorporatecardIndex], id: null }
        );
      })
    );
  }

}
