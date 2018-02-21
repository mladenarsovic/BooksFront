import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { BookListComponent } from './components/book-list/book-list.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    component: BookListComponent
  },
  {
    path: 'book-details',
    component: BookDetailsComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailsComponent,
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
