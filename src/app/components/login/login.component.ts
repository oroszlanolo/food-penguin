declare var google: any;
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  get user() {
    return this.userService.user;
  }
  loggedIn = this.userService.loggedIn;

  constructor(private userService: UserService, private router: Router ) {}

  ngOnInit(): void {
    if(this.userService.googleReady) {
      this.createLoginBtn();
    } else {
      this.userService.googleReadyEvt.subscribe(() => this.createLoginBtn());
    }
    this.userService.loginEvt.subscribe(() => {
      location.reload();
    });
  }

  private createLoginBtn() {
    if(!this.userService.loggedIn) {
        google.accounts.id.renderButton(document.getElementById('google-btn'), {
        text: 'signin',
        theme: 'filled_black',
        size: 'medium',
        shape: 'pill',
        locale: 'en_us'
      });
    }
  }
}

