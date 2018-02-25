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
  books: Book[] = [];

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
  // Displaying create new book form
  onNewBook() {
    if (this.auth.isAuthenticated) {
      this.router.navigateByUrl('/books/new');
    }
  }
  // Filter book list by book title
  onSearchTitle(title) {
    this.bookService.searchBookByTitle(title)
      .subscribe((books: Book[]) => {
        this.books = books;
      }, (error) => {
        alert(`Server returned code: ${error.status} with message: ${error.error}`);
      });
  }
  // Filter book list by book title
  onSearchYear(year) {
    this.bookService.searchBookByYear(year)
      .subscribe((books: Book[]) => {
        this.books = books;
      }, (error) => {
        alert(`Server returned code: ${error.status} with message: ${error.error}`);
      });
  }
// Fetch next page of book list
  nextPage() {
    this.bookService.nextPage()
      .subscribe((books: Book[]) => {
        this.books = books;
      }, (error) => {
        alert(`Error with code ${error.status} and status ${error.error}`);
      });
  }

}
