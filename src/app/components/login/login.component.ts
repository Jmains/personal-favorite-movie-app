// Angular
import { Component, OnInit } from '@angular/core';
// Services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.logout();
    console.log('logging user out from login component');
  }

  login(): void {
    this.authService.googleSignin();
  }

}
