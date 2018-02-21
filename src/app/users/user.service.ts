import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { User } from './user.model';

@Injectable()
export class UserService {

  private users: User[];

  constructor(private http: HttpClient) {}

  addUser(user: User) {
    return new Observable((observer: Observer<any>) => {
      this.http.post('http://localhost:8000/api/users', {
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
        this.users.push(registeredUser);
        observer.next(registeredUser);
        return observer.complete();
      }, (err) => {
            alert(`You can't add new user!`);
         });
    });
  }
}
