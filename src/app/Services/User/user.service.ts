import { HttpService } from './../Http/http.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  url: string = 'https://localhost:7189';
  constructor(private httpService: HttpService) {}

  signUp(data: object) {
    let headerConfig = {
      headers: {
        'content-type': 'application/json',
      },
    };
    return this.httpService.postService(
      this.url + '/api/User',
      data,
      false,
      headerConfig
    );
  }

  logIn(data: any) {
    let headerConfig = {
      headers: {
        'content-type': 'application/json',
      },
    };
    return this.httpService.postService(
      this.url +
        '/api/Login?userEmail=' +
        data.userEmail +
        '&password=' +
        data.password,
      data,
      false,
      headerConfig
    );
  }
}
