import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer/ngx';

@Component({
  selector: 'app-query',
  templateUrl: './query.page.html',
  styleUrls: ['./query.page.scss'],
})

export class QueryPage implements OnInit {
  form: FormGroup;
  subject = '';
  body = '';
  from: '';
  to: '';

  constructor(
    public emailComposer: EmailComposer
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      queryName: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      }),
      queryPhoneNumber: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required, Validators.maxLength(10)]
      }),
      queryMessage: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required]
      })
    });
  }

  // onQuerySubmit() {
  //   this.body = "Name: " + this.form.value.queryName + ", PhoneNumber: " + this.form.value.queryPhoneNumber + ", Message: " + this.form.value.queryMessage;
  //   this.from = this.form.value.queryEmailId;

  //   let email = {
  //     from: this.from,
  //     to: "alisha95sasiwal@gmail.com",
  //     cc: [],
  //     bcc: [],
  //     attachment: [],
  //     subject: "Coded Cards Query",
  //     body: this.body,
  //     isHtml: false,
  //     app: "Gmail"
  //   }
  //   this.emailComposer.open(email);

  // }

  onQuerySubmit() {
    this.emailComposer.isAvailable()
      .then((available: boolean) => {
        this.emailComposer.hasPermission()
          .then((isPermitted: boolean) => {
            
            this.body = "Name: " + this.form.value.queryName + ", PhoneNumber: " + this.form.value.queryPhoneNumber + ", Message: " + this.form.value.queryMessage;
            this.from = this.form.value.queryEmailId;

            let email: any = {
              to: "alisha95sasiwal@gmail.com",
              from: this.from,
              cc: [],
              bcc: [],
              app: 'mailto',            
              attachments: [],
              subject: "Coded Cards Query",
              body: this.body
            };
            this.emailComposer.open(email);
          })
          .catch((error: any) => {
            console.log('No access permission granted');
            console.dir(error);
          });
      })
      .catch((error: any) => {
        console.log('User does not appear to have device e-mail account');
        console.dir(error);
      });
  }

}
