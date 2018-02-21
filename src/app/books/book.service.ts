import { Book } from './../book.model';

export class BookService {

  books: Book[] = [
    new Book('Moby Dick', 'Herman Melvile', '1851', 'English', 'English'),
    new Book('Moby Dick', 'Herman Melvile', '1851', 'English', 'English'),
    new Book('Moby Dick', 'Herman Melvile', '1851', 'English', 'English'),
    new Book('Moby Dick', 'Herman Melvile', '1851', 'English', 'English'),
    new Book('Hamlet', 'William Shakespeare', '1599 or 1601', 'English', 'English'),
    new Book('Hamlet', 'William Shakespeare', '1599', 'English', 'English')
  ];

  getBooks() {
    return this.books.slice();
  }

  getBook(index: number) {
    return this.books[index];
  }
}
