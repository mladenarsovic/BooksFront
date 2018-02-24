import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class AuthService {
  public isAuthenticated: boolean;

  constructor(private http: HttpClient,
              private router: Router) {
    const token = window.localStorage.getItem('token');
    this.isAuthenticated = !!token;
 }

 login(email: string, password: string) {
   return new Observable((observer: Observer<any>) => {
     this.http.post('http://localhost:8000/api/login', {
       email: email,
       password: password
    }).subscribe((data: {token: string, user}) => {
      window.localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.token));
      this.isAuthenticated = true;
      observer.next(data.token);
      return observer.complete();
    }, (err) => {
          return observer.error(err);
      });
   });
 }

 logout() {
   window.localStorage.removeItem('token');
   this.isAuthenticated = false;
   this.router.navigateByUrl('books');
 }

 getRequestHeaders() {
   const token = window.localStorage.getItem('token');
   return new HttpHeaders().set('Authorization', `Bearer ${token}`);
 }
}
