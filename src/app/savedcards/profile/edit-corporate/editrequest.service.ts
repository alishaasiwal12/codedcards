import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { BehaviorSubject, of } from 'rxjs';
import { take, map, tap, delay, switchMap } from 'rxjs/operators';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Editrequest } from './editcorporate.model';
import { AuthService } from '../../../auth/auth.service';

interface EditrequestData {
  name: string,
  newdesignation: string,
  newcontactnumber: number,
  newofficeaddress: string,
  olddesignation: string,
  oldcontactnumber: number,
  oldofficeaddress: string,
  userId: string,
  userEmail: string,
  status: string,
}

@Injectable({
  providedIn: 'root'
})
export class EditrequestService {

  private _editrequests = new BehaviorSubject<Editrequest[]>([]);

  get editrequests() {
    return this._editrequests.asObservable();
  }

  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) { }

  addEditRequest(  
    name: string,
    newdesignation: string,
    newcontactnumber: number,
    newofficeaddress: string,
    olddesignation: string,
    oldcontactnumber: number,
    oldofficeaddress: string,
    userId: string,
    userEmail: string
  ) {
    let generatedId: string;
    let fetchedUserId: string;
    let newEditrequest: Editrequest;
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
        newEditrequest = new Editrequest(
          Math.random().toString(),
          name,
          newdesignation,
          newcontactnumber,
          newofficeaddress,
          olddesignation,
          oldcontactnumber,
          oldofficeaddress,
          userId,
          userEmail,
          "Pending"
        );
        return this.http.post<{ name: string }>(
          `https://codedcards.firebaseio.com/editrequests.json?auth=${token}`,
          {
            ...newEditrequest,
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
        return this.editrequests;
      })
    );
  }
}
