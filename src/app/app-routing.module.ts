import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BooksComponent } from './components/books/books.component';
import { BookListComponent } from './components/books/book-list/book-list.component';
import { BookDetailsComponent } from './components/books/book-details/book-details.component';
import { BookItemComponent } from './components/books/book-list/book-item/book-item.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { BookEditComponent } from './components/books/book-edit/book-edit.component';


const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'books',
    pathMatch: 'full'
  },
  {
    path: 'books',
    component: BooksComponent,
    children: [
      {
        path: 'new',
        component: BookEditComponent
      },
      {
        path: ':id',
        component: BookDetailsComponent
      },
      {
        path: ':id/edit',
        component: BookEditComponent
      }
    ]
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
    BooksComponent,
    BookListComponent,
    BookDetailsComponent,
    BookItemComponent,
    RegisterComponent,
    LoginComponent,
    BookEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {}
