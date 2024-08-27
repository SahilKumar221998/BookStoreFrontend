import { Observable } from 'rxjs';
import { HttpService } from './../Http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  url: string = 'https://localhost:7189';
  constructor(private httpService: HttpService) {}

  getAllBooks() {
    return this.httpService.getService(this.url + '/api/Book', false, {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  getBookById(bookId: number): Observable<any> {
    return this.httpService.getService(`${this.url}/api/Id?bId=${bookId}`);
  }
}
