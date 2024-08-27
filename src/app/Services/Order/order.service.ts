import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  url: string = 'https://localhost:7189';
  token: any;
  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem('token');
  }

  order(data: any) {
    const header = {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    return this.httpService.postService(this.url + '/api/Order', data, true, {
      headers: header,
    });
  }

  getOrder(): Observable<any> {
    const header = {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    return this.httpService.getServices(this.url + '/api/Order', true, {
      headers: header,
    });
  }
}
