import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-customertype',
  templateUrl: './customertype.page.html',
  styleUrls: ['./customertype.page.scss'],
})
export class CustomertypePage implements OnInit {

  constructor(private authService: AuthService,) { }

  ngOnInit() {
  }

  onLogout() {
    this.authService.logout();
  }

}
