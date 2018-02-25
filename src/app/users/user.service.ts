import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Router } from '@angular/router';
import { AuthService } from './../auth/auth.service';
import { User } from './user.model';

@Injectable()
export class UserService {

  constructor(private http: HttpClient,
              private router: Router,
              private auth: AuthService) {}
  // Register new user
  addUser(user) {
    return new Observable((observer: Observer<any>) => {
      this.http.post('http://localhost:8000/api/register', {
        name: user.name,
        email: user.email,
        password: user.password
      })
      .subscribe((newUser: any) => {
        const registeredUser = new User(
          newUser.name,
          newUser.email,
          newUser.password
        );
        observer.next(registeredUser);
        return observer.complete();
      }, (err) => {
            alert(`You can't add new user!`);
         });
         this.router.navigateByUrl('books');
      // User is loged in and redirected to books page after registration
      this.auth.login(user.email, user.password)
        .subscribe((token: string) => {
          this.router.navigateByUrl('books');
         }, (error) => {
           alert(`${error.error}`);
         });
    });
  }
}
