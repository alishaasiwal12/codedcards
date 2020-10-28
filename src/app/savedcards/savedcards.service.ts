import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Savedcard } from './savedcards.model';
import { AuthService } from '../auth/auth.service';

interface SavedcardData {
  templatetype: string,
  name: string,
  designation: string,
  contactnumber: number,
  companyname: string,
  companytagline: string,
  companywebsite: string,
  officeaddress: string,
  userId: string,
  userEmail: string,
  imageUrl: string,
  linkedinurl: string,
  facebookurl: string,
  instagramurl: string,
  logoUrl: string,
  customer: string
}

interface UserCardData {
  filename: string;
  filepath: string;
  size: number;
}

interface UserLogoData {
  filename: string;
  filepath: string;
  size: number;
}

@Injectable({
  providedIn: 'root'
})

export class SavedcardsService {

  private _savedcards = new BehaviorSubject<Savedcard[]>([]);

  get savedcards() {
    return this._savedcards.asObservable();
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  addUser(  
    templatetype: string,
    name: string,
    designation: string,
    contactnumber: number,
    companyname: string,
    companytagline: string,
    companywebsite: string,
    officeaddress: string,
    fetchedUserEmail: string,
    imageUrl: string,
    linkedinurl: string,
    facebookurl: string,
    instagramurl: string,
    logoUrl: string,
    customer: string
  ) {
    let generatedId: string;
    let fetchedUserId: string;
    let newSavedcard: Savedcard;
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
        newSavedcard = new Savedcard(
          Math.random().toString(),
          templatetype,
          name,
          designation,
          contactnumber,
          companyname,
          companytagline,
          companywebsite,
          officeaddress,
          fetchedUserId,
          fetchedUserEmail,
          imageUrl,
          linkedinurl,
          facebookurl,
          instagramurl,
          logoUrl,
          customer
        );
        return this.http.post<{ name: string }>(
          `https://codedcards.firebaseio.com/customers.json?auth=${token}`,
          {
            ...newSavedcard,
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
        return this.savedcards;
      })
    );
  }

  getMyAccount(fetchedUserEmail: string) {
    let fetchedUserId: string;
    return this.authService.token.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      switchMap(token => {
        return this.http.get<SavedcardData>(
          `https://codedcards.firebaseio.com/customers.json?auth=${token}`
        );
      }),
      map(savedcardData => {
        if (savedcardData != null || savedcardData != undefined) {
          for (var key in savedcardData) {
            if (!savedcardData.hasOwnProperty(key)) continue;
            var output = savedcardData[key].userEmail;
            if (output == fetchedUserEmail) {
                var response = savedcardData[key];
                return new Savedcard(
                  fetchedUserEmail,
                  response.templatetype,
                  response.name,
                  response.designation,
                  response.contactnumber,
                  response.companyname,
                  response.companytagline,
                  response.companywebsite,
                  response.officeaddress,
                  response.userId,
                  response.userEmail,
                  response.imageUrl,
                  response.linkedinurl,
                  response.facebookurl,
                  response.instagramurl,
                  response.logoUrl,
                  response.customer
  
                );
            }
          }
        } else {
          return null;
        }

      })
    );
  }

  getReceiver(receiverContactNumber: number) {
    let fetchedUserEmail: string;
    return this.authService.token.pipe(
      take(1),
      switchMap(email => {
        fetchedUserEmail = email;
        return this.authService.token;
      }),
      switchMap(token => {
        return this.http.get<SavedcardData>(
          `https://codedcards.firebaseio.com/customers.json?auth=${token}`
        );
      }),
      map(savedcardData => {
        if (savedcardData != null || savedcardData != undefined) {
          for (var key in savedcardData) {
            if (!savedcardData.hasOwnProperty(key)) continue;
            var output = savedcardData[key].contactnumber;
            if (output == receiverContactNumber) {
              var response = savedcardData[key];
              return new Savedcard(
                fetchedUserEmail,
                response.templatetype,
                response.name,
                response.designation,
                response.contactnumber,
                response.companyname,
                response.companytagline,
                response.companywebsite,
                response.officeaddress,
                response.userId,
                response.userEmail,
                response.imageUrl,
                response.linkedinurl,
                response.facebookurl,
                response.instagramurl,
                response.logoUrl,
                response.customer
              );
            }
          }
        } else {
          return null;
        }
      })
    );
  }

  fetchUsers() {
    let fetchedUserEmail: string;
    return this.authService.token.pipe(
      take(1),
      switchMap(email => {
        fetchedUserEmail = email;
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        return this.http.get<{ [key: string]: SavedcardData }>(
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
                  new Savedcard(
                    fetchedUserEmail,
                    response.templatetype,
                    response.name,
                    response.designation,
                    response.contactnumber,
                    response.companyname,
                    response.companytagline,
                    response.companywebsite,
                    response.officeaddress,
                    response.userId,
                    response.userEmail,
                    response.imageUrl,
                    response.linkedinurl,
                    response.facebookurl,
                    response.instagramurl,
                    response.logoUrl,
                    response.customer
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

  updateAccount(
    userId: string, 
    designation: string, 
    contactnumber: number, 
    officeaddress: string, 
    imageUrl: string) {
    let updatedSavedcard: Savedcard[];
    let fetchedToken: string;
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        fetchedToken = token;
        return this.savedcards;
      }),
      take(1),
      switchMap(savedcards => {
        if (!savedcards || savedcards.length <= 0) {
          return this.fetchUsers();
        } else {
          return of(savedcards);
        }
      }),
      switchMap(savedcards => {
        const updatedSavedcardIndex = savedcards.findIndex(user => user.id === userId);
        updatedSavedcard = [...savedcards];
        const oldSavedcard = updatedSavedcard[updatedSavedcardIndex];
        updatedSavedcard[updatedSavedcardIndex] = new Savedcard(
          oldSavedcard.id,
          oldSavedcard.templatetype,
          oldSavedcard.name,
          designation,
          contactnumber,
          oldSavedcard.companyname,
          oldSavedcard.companytagline,
          oldSavedcard.companywebsite,
          officeaddress,
          oldSavedcard.userId,
          oldSavedcard.userEmail,
          imageUrl,
          oldSavedcard.linkedinurl,
          oldSavedcard.facebookurl,
          oldSavedcard.instagramurl,
          oldSavedcard.logoUrl,
          oldSavedcard.customer
        );
        return this.http.put(
          `https://codedcards.firebaseio.com/customers/${userId}.json?auth=${fetchedToken}`,
          { ...updatedSavedcard[updatedSavedcardIndex], id: null }
        );
      })
    );
  }

}
