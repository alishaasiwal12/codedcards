import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavController } from '@ionic/angular';
import { IonItemSliding, LoadingController } from '@ionic/angular';

import { HttpClient } from '@angular/common/http';
import { Papa } from 'ngx-papaparse';
import { Platform } from '@ionic/angular';
import { File } from '@ionic-native/file/ngx';
import { SocialSharing } from '@ionic-native/social-sharing';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-employeescards',
  templateUrl: './employeescards.page.html',
  styleUrls: ['./employeescards.page.scss'],
})
export class EmployeescardsPage implements OnInit {

  csvData: any[] = [];
  headerRow: any[] = [];

  constructor(
    public navCtrl: NavController, 
    private http: HttpClient,
    private papa: Papa,
    private plt: Platform,
    private file: File
    // private socialSharing: SocialSharing
  ) { 
    this.loadCSV();
  }

  ngOnInit() {
  }

  private loadCSV() {
    this.http
      .get('../../assets/Corporate_List.csv', {
        responseType: 'text'
      })
      .subscribe(
        data => this.extractData(data),
        err => console.log('something went wrong: ', err)
      );
  }
 
  private extractData(res) {
    let csvData = res || '';
 
    this.papa.parse(csvData, {
      complete: parsedData => {
        this.headerRow = parsedData.data.splice(0, 1)[0];
        this.csvData = parsedData.data;
      }
    });
  }

  exportCSV() {
    let csv = this.papa.unparse({
      fields: this.headerRow,
      data: this.csvData
    });
 
    if (this.plt.is('cordova')) {
      this.file.writeFile(this.file.dataDirectory, 'EmployeeForm.csv', csv, {replace: true}).then( res => {
        SocialSharing.share(null, null, res.nativeURL, null).then(e =>{
          // Success
        }).catch(e =>{
          console.log('Share failed:', e)
        });
      }, err => {
        console.log('Error: ', err);
      });
    } else {
      // Dummy implementation for Desktop download purpose
      var blob = new Blob([csv]);
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = 'EmployeeForm.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
 
  trackByFn(index: any, item: any) {
    return index;
  }

}
