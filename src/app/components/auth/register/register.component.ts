import { Component, OnInit } from '@angular/core';

import { UserService } from './../../../shared/services/user.service';
import { User } from '../../../shared/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  private newUser: User = new User;

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  registerUser(newUser) {
    this.userService.addUser(newUser).subscribe();
  }
}
