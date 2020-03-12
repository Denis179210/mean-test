import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public accessTokenSubject = new BehaviorSubject<string>(null);

  constructor(
    private http: HttpClient
  ) { }

  signup(payload: any) {
    return this.http.post('/auth/signup', {...payload});
  }

  signin(credentials: {email: string; password: string}) {
    return this.http.post('/auth/signin', {...credentials});
  }
}
