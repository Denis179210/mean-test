import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReplaySubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public currentUserSubject = new ReplaySubject();
  public currentUser$ = this.currentUserSubject.asObservable().pipe(filter(cu => !!cu));

  constructor(
    private http: HttpClient
  ) { }

  me() {
    return this.http.get('/user/me');
  }
}
