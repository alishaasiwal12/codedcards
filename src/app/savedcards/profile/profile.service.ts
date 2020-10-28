import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { take, tap, delay, switchMap, map } from 'rxjs/operators';

import { Sending } from '../profile/profile.model';
import { AuthService } from '../../auth/auth.service';

interface SendingData {
  userId: string,
  senderName: string,
  senderContactNumber: number,
  senderCompanyName: string, 
  senderCardImage: string,
  senderLinkedinUrl: string, 
  senderFacebookUrl: string,
  senderInstagramUrl: string, 
  receiverUserId: string,
  receiverName: string,
  receiverContactNumber: number,
  receiverCompanyName: string
}

@Injectable({ providedIn: 'root' })
export class SendingService {
  private _sendings = new BehaviorSubject<Sending[]>([]);

  get sendings() {
    return this._sendings.asObservable();
  }

  constructor(private authService: AuthService, private http: HttpClient) { }

  addCard(
    senderName: string,
    senderContactNumber: number,
    senderCompanyName: string, 
    senderCardImage: string,
    senderLinkedinUrl: string, 
    senderFacebookUrl: string,
    senderInstagramUrl: string, 
    receiverUserId: string,
    receiverName: string,
    receiverContactNumber: number,
    receiverCompanyName: string
  ) {
    let generatedId: string;
    let newSending: Sending;
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        newSending = new Sending(
          Math.random().toString(),
          fetchedUserId,
          senderName,
          senderContactNumber,
          senderCompanyName,
          senderCardImage,
          senderLinkedinUrl, 
          senderFacebookUrl,
          senderInstagramUrl, 
          receiverUserId,
          receiverName,
          receiverContactNumber,
          receiverCompanyName
        );

        return this.http.post<{ name: string }>(
          // `https://codedcards.firebaseio.com/sharedcards.json?auth=${token}`,
          `https://codedcards.firebaseio.com/savedcards.json?auth=${token}`,
          {
            ...newSending,
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
        return this.sendings;
      })
    );
  }

  deleteCard(sharecardsId: string) {
    return this.authService.token.pipe(
      take(1),
      switchMap(token => {
        return this.http.delete(
          `https://codedcards.firebaseio.com/savedcards/${sharecardsId}.json?auth=${token}`
        );
      }),
      switchMap(() => {
        return this.sendings;
      }),
      take(1),
      tap(sendings => {
        this._sendings.next(sendings.filter(b => b.id !== sharecardsId));
      })
    );
  }

  fetchSavedcards() {
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        return this.http.get<{ [key: string]: SendingData }>(
          `https://codedcards.firebaseio.com/savedcards.json?auth=${token}`
          // `https://codedcards.firebaseio.com/sharedcards.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`
        );
      }),
      map(sendingData => {
        const sendings = [];
        if (sendingData != null || sendingData != undefined) {
          for (var key in sendingData) {
            if (sendingData.hasOwnProperty(key)) {
              var response = sendingData[key];
              var output = response.receiverUserId;
              if (output == fetchedUserId) {
                sendings.push(
                  new Sending(
                    key,
                    response.userId,
                    response.senderName,
                    response.senderContactNumber,
                    response.senderCompanyName,
                    response.senderCardImage,
                    response.senderLinkedinUrl, 
                    response.senderFacebookUrl,
                    response.senderInstagramUrl, 
                    response.receiverUserId,
                    response.receiverName,
                    response.receiverContactNumber,
                    response.receiverCompanyName
                  )
                );
              }
            }
          }
          return sendings;
        } else {
          return null;
        }
      }),
      tap(sendings => {
        this._sendings.next(sendings);
      })
    );
  }

  fetchSharedcards() {
    let fetchedUserId: string;
    return this.authService.userId.pipe(
      take(1),
      switchMap(userId => {
        fetchedUserId = userId;
        return this.authService.token;
      }),
      take(1),
      switchMap(token => {
        return this.http.get<{ [key: string]: SendingData }>(
          `https://codedcards.firebaseio.com/savedcards.json?auth=${token}`
          // `https://codedcards.firebaseio.com/sharedcards.json?orderBy="userId"&equalTo="${fetchedUserId}"&auth=${token}`
        );
      }),
      map(sendingData => {
        const sendings = [];
        if (sendingData != null || sendingData != undefined) {
          for (var key in sendingData) {
            if (sendingData.hasOwnProperty(key)) {
              var response = sendingData[key];
              var output = response.userId;
              if (output == fetchedUserId) {
                sendings.push(
                  new Sending(
                    key,
                    response.userId,
                    response.senderName,
                    response.senderContactNumber,
                    response.senderCompanyName,
                    response.senderCardImage,
                    response.senderLinkedinUrl, 
                    response.senderFacebookUrl,
                    response.senderInstagramUrl, 
                    response.receiverUserId,
                    response.receiverName,
                    response.receiverContactNumber,
                    response.receiverCompanyName
                  )
                );
              }
            }
          }
          return sendings;
        } else {
          return null;
        }
      }),
      tap(sendings => {
        this._sendings.next(sendings);
      })
    );
  }

}
