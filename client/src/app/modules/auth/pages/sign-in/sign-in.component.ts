import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../../../services/user.service';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  public FormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [
      (emailControl: AbstractControl) => {
        return !(new RegExp(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/).test(emailControl.value.trim()))
          ? { invalid_email: { value: true, title: 'Field \'Email\' is invalid' }}
          : null;
      },
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
    ]),
  });

  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
  ) { }

  ngOnInit(): void {
  }

  signup() {
    this.router.navigate([ 'auth', 'signup']);
  }

  login() {
    if (!this.FormGroup.valid) {
      return;
    }
    this.authService.signin({...this.FormGroup.value})
      .pipe(
        tap(({token}: any) => {
          localStorage.setItem('access_token', token);
          this.authService.accessTokenSubject.next(token);
        }),
        switchMap(() => {
          return this.userService.me();
        })
      )
      .subscribe((currentUser: any) => {
        localStorage.setItem('current_user', JSON.stringify(currentUser));
        this.userService.currentUserSubject.next(currentUser);
        this.router.navigate(['records']);
      });
  }

}
