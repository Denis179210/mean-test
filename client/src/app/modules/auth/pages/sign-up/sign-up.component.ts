import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { switchMap, tap } from 'rxjs/operators';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  public FormGroup: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      (firstNameControl: AbstractControl) => {
        return !(new RegExp(/^([a-zA-Z]+$)/).test(firstNameControl.value.trim()))
          ? {invalid_first_name: { value: true, title: 'Field \'First Name\' is invalid' }}
          : null;
      },
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      (lastNameControl: AbstractControl) => {
        return !(new RegExp(/^([a-zA-Z]+$)/).test(lastNameControl.value.trim()))
          ? {invalid_last_name: { value: true, title: 'Field \'Last Name\' is invalid' }}
          : null;
      },
    ]),
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

  ngOnInit(): void {}

  signin() {
    this.router.navigate([ 'auth', 'signin']);
  }

  submit() {
    if (!this.FormGroup.valid) {
      return;
    }
    this.authService.signup(this.FormGroup.value)
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
