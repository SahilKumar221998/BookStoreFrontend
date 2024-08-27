import { Injectable } from '@angular/core';
import { HttpService } from '../Http/http.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  url: string = 'https://localhost:7189';
  token: any;
  constructor(private httpService: HttpService) {
    this.token = localStorage.getItem('token');
  }

  addToWishList(data: any) {
    const header = {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    return this.httpService.postService(
      this.url + '/api/WishList',
      data,
      true,
      { headers: header }
    );
  }
  getWishList() {
    const header = {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    return this.httpService.getServices(this.url + '/api/WishList', true, {
      headers: header,
    });
  }

  removeWishlistItem(wishlistId: number): Observable<any> {
    const header = {
      'Content-type': 'application/json',
      Authorization: 'Bearer ' + this.token,
    };
    return this.httpService.deleteService(
      this.url + '/Delete?wishListId=' + wishlistId,
      {},
      true,
      { headers: header }
    );
  }
}
