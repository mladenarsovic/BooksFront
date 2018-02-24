import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { BookService } from './../book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {
  id: number;
  editMode = false;
  bookForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private bookService: BookService) { }

  ngOnInit() {
    // Populate form (or not) based on current URL and mode
    this.route.params
      .subscribe((params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initializeForm();
      });
  }
  // Save new or edit existing book
  onSubmit() {
    if (this.editMode) {
      const book = this.bookService.getBook(this.id);
      this.bookService.updateBook(book.id, this.bookForm.value).subscribe();
      // Because the form has the same
      // controls as the Book model fields, we can just pass bookForm.value to the method
    } else {
      this.bookService.addBook(this.bookForm.value).subscribe();
    }
    this.onCancel();
  }
  // Return on home page
  onCancel() {
    this.router.navigateByUrl('/');
  }

  // Method for populating the form if the user is in edit mode
  private initializeForm() {
    let bookTitle = '';
    let bookAuthor = '';
    let bookPublishYear = '';
    let bookLanguage = '';
    let bookOriginalLanguage = '';

    if (this.editMode) {
      const book = this.bookService.getBook(this.id);
      bookTitle = book.title;
      bookAuthor = book.author;
      bookPublishYear = book.publishYear;
      bookLanguage = book.language;
      bookOriginalLanguage = book.originalLanguage;
    }
    this.bookForm = new FormGroup({
      'title': new FormControl(bookTitle),
      'author': new FormControl(bookAuthor),
      'publishYear': new FormControl(bookPublishYear),
      'language': new FormControl(bookLanguage),
      'originalLanguage': new FormControl(bookOriginalLanguage)
    });
  }

}
