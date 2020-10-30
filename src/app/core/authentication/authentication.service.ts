import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import {User} from '../models/user';
import {TokenStorage} from '../../_shared/utility/TokenStorage';
import { Router } from '@angular/router';
import { EnvService } from '../../_shared/utility/env.service';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  public serverApiUrl: any;

  constructor(private http: HttpClient,
              private tokenStorage: TokenStorage,
              private router: Router,
              private envService: EnvService) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('APP_STORAGE_TOKEN')));
    this.currentUser = this.currentUserSubject.asObservable();
    this.serverApiUrl = this.envService.apiUrl();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(this.serverApiUrl.API_URL + `/token/generate-token`, { username, password }, { observe: 'response' })
      .pipe(map(user => {
        // store user details and jwt token in local storage to keep user logged in between page refreshes
        localStorage.setItem('APP_STORAGE_TOKEN', JSON.stringify(user.body));
        sessionStorage.setItem('SESSION_ID', user.headers.get('JSESSIONID'));
        this.currentUserSubject.next(user.body);
        console.log(user.headers.get('JSESSIONID'));
        return user.body;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    this.http.post<any>(this.serverApiUrl.API_URL + `/token/logout`, sessionStorage.getItem('SESSION_ID')).subscribe(data => {

     });

    localStorage.removeItem('APP_STORAGE_TOKEN');
    sessionStorage.removeItem('SESSION_ID');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);

  }
}
