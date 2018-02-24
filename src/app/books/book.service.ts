import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Book } from './book.model';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { AuthService } from './../auth/auth.service';

@Injectable()
export class BookService {

  books: Book[] = [];

  constructor(private http: HttpClient,
              private auth: AuthService,
              private router: Router) {}
  // Fetching all books from database
  getBooks() {
    return new Observable((observer: Observer<any>) => {
      this.http.get('http://localhost:8000/api/books')
        .subscribe((books: any) => {
          this.books = books.data.map((book) => {
            return new Book(
              book.id,
              book.title,
              book.author,
              book.publish_year,
              book.language,
              book.original_language
            );
          });
          observer.next(this.books);
          return observer.complete();
      });
    });
  }
  // Return single book from books array
  getBook(index: number) {
    return this.books[index];
  }
  // Create new book
  addBook(book: Book) {
    return new Observable((observer: Observer<any>) => {
      this.http.post('http://localhost:8000/api/book', {
        title: book.title,
        author: book.author,
        publish_year: book.publishYear,
        language: book.language,
        original_language: book.originalLanguage
      },
      {
        headers: this.auth.getRequestHeaders()
      }).subscribe((newBook: any) => {
          const addedBook = new Book(
            newBook.title,
            newBook.author,
            newBook.publish_year,
            newBook.language,
            newBook.original_language
          );
          this.books.push(addedBook);
          observer.next(addedBook);
          this.router.navigateByUrl('books');
          return observer.complete();
        }, () => {
             alert(`Error, you can't add new book!`);
        });
    });
  }
  // Delete selected book
  removeBook(book: Book) {
    return new Observable((observer: Observer<any>) => {
      this.http.delete('http://localhost:8000/api/book/' + book.id,
        {
          headers: this.auth.getRequestHeaders()
        })
        .subscribe(() => {
          const index = this.books.indexOf(book);
          this.books.splice(index, 1);
          this.router.navigateByUrl('books');
          observer.next(index);
          return observer.complete();
        });
    });
  }
  // Edit selected book
  updateBook(id: number, book: Book) {
    return new Observable((observer: Observer<any>) => {
      this.http.put('http://localhost:8000/api/book/' + id + '/edit', {
        title: book.title,
        author: book.author,
        publish_year: book.publishYear,
        language: book.language,
        original_language: book.originalLanguage
      },
        {
          headers: this.auth.getRequestHeaders()
        }
      ).subscribe((editedBook) => {
          const index = this.books.indexOf(book);
          this.books.splice(index, 1, editedBook);
          this.router.navigateByUrl('books');
          observer.next(this.books);
          return observer.complete();
      });
    });
  }
  // Filter books on backend by title
  searchBookByTitle(title) {
    return new Observable((observer: Observer<any>) => {
      this.http.get('http://localhost:8000/search-title/' + title,
      {
        headers: this.auth.getRequestHeaders()
      }
    ).subscribe((books: Book[]) => {
        this.books = books;
        observer.next(this.books);
        return observer.complete();
      });
    });
  }
  // Filter books on backend by year
  searchBookByYear(year) {
    return new Observable((observer: Observer<any>) => {
      this.http.get('http://localhost:8000/search-year/' + year,
        {
          headers: this.auth.getRequestHeaders()
        }
      ).subscribe((books: Book[]) => {
          this.books = books;
          observer.next(this.books);
          return observer.complete();
        });
    });
  }
}
