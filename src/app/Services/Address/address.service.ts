import { HttpService } from './../Http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  url: string = 'https://localhost:7189';
  token: any;
  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem('token');
  }

  addAddress(data: any) {
    const header = {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    return this.httpService.postService(this.url + '/api/Address', data, true, {
      headers: header,
    });
  }

  getAddress() {
    const header = {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    return this.httpService.getServices(this.url + '/api/Address', true, {
      headers: header,
    });
  }
}
