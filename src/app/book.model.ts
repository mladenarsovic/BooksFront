export class Book {
  public title: string;
  public author: string;
  public publishYear: string;
  public language: string;
  public originalLanguage: string;

  constructor(title: string,
              author: string,
              publishYear: string,
              language: string,
              originalLanguage: string) {
    this.title = title;
    this.author = author;
    this.publishYear = publishYear;
    this.language = language;
    this.originalLanguage = originalLanguage;
  }
}

