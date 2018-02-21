import { Component, OnInit } from '@angular/core';
import { UserService } from './../../users/user.service';
import { User } from './../../users/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private newUser: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  registerUser(user: User) {
    this.userService.addUser(user).subscribe();
  }
}
