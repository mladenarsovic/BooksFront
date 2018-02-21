import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class BookService {

  private books: Book[];

  constructor(private http: HttpClient) {}

  getBooks() {
    return new Observable((observer: Observer<any>) => {
      this.http.get('http://localhost:8000/api/books')
      .subscribe((books: any[]) => {
        this.books = books.map((book) => {
          return new Book(
            book.id,
            book.title,
            book.author,
            book.publishYear,
            book.language,
            book.originalLanguage
          );
        });
        observer.next(this.books);
        return observer.complete;
      });
    });
  }

  getBook(index: number) {
    return this.books[index];
  }
}
