import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Book } from './../book.model';
import { BookService } from './../book.service';
import { AuthService } from './../../auth/auth.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  id: number;

  constructor(private bookService: BookService,
              private route: ActivatedRoute,
              private auth: AuthService,
              private router: Router) {}

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.book = this.bookService.getBook(this.id);
      }
    );
  }

  onBookUpdate() {
    this.bookService.updateBook(this.id, this.book)
      .subscribe((editedBook: Book) => {
        this.book = editedBook;
      });
  }

  onRemoveBook() {
    this.bookService.removeBook(this.book).subscribe();
  }

  onBookEdit() {
    this.router.navigateByUrl(`books/${this.id}/edit`);
  }

}
