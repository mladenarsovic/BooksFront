import { Component, OnInit } from '@angular/core';
import { BookService } from './../book.service';
import { Book } from './../book.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.bookService.getBooks()
      .subscribe((books) => {
        this.books = books;
      }, (err: HttpErrorResponse) => {
        alert(`Backend returned code ${err.status} with message: ${err.error}`);
      }
    );
  }

}
