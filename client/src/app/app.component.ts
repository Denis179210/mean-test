import { Component, OnInit } from '@angular/core';
import { AuthService } from './modules/auth/services/auth.service';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

    const tokenCache = localStorage.getItem('access_token');
    const currentUserCache = localStorage.getItem('current_user');

    if (tokenCache) {
      this.authService.accessTokenSubject.next(tokenCache);
    } else {
      this.router.navigate(['auth', 'signin']);
    }

    if (currentUserCache) {

      try {
        const user = JSON.parse(currentUserCache);
        this.userService.currentUserSubject.next(user);
        this.router.navigate(['records']);
      } catch (e) {
        console.error(e);
        this.router.navigate(['auth', 'signin']);
      }

    }
  }

}
