import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './../../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
  }
  // User login
  login(email, password) {
    this.auth.login(email, password)
      .subscribe((token: string) => {
        this.router.navigateByUrl('/');
      }, (error) => {
        alert(`You can't login! ${error.error}`);
      });
  }
}
