// Angular
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
// Services
import { AuthService } from '../../services/auth.service';
// RxJS
import { Observable, Subscription } from 'rxjs';
// Models
import { User } from '../../models/user.model';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  subscription: Subscription = new Subscription();
  user$: Observable<User> = this.authService.user$;
  user: User;

  constructor(public authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.subscription.add(this.user$.subscribe(user => {this.user = user;}));
  }

  goToHome(): void {
    this.router.navigate([`/movies/${this.user.uid}`]);
  }

  signOut(): void {
    this.authService.logout();
    // console.log('logging out from navbar component');
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
