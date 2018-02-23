import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BookService } from './../book.service';
import { AuthService } from './../../auth/auth.service';
import { Book } from './../book.model';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  public books: Book[] = [];

  constructor(private bookService: BookService,
              private auth: AuthService,
              private route: ActivatedRoute,
              private router: Router) {}

  ngOnInit() {
    // Fetch books on app initialization
    this.bookService.getBooks()
      .subscribe((books) => {
        this.books = books;
      }, (err: HttpErrorResponse) => {
        alert(`Backend returned code ${err.status} with message: ${err.error}`);
      }
    );
  }

  onNewBook() {
    if (this.auth.isAuthenticated) {
      this.router.navigate(['new', {relativeTo: this.route}]);
    }
  }

}
