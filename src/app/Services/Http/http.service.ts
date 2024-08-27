import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private httpClient: HttpClient) {}

  postService(
    url: string,
    data: any,
    token: boolean = false,
    httpOptions: any
  ) {
    return this.httpClient.post(url, data, token && httpOptions);
  }
  getService(
    url: string,
    token: boolean = false,
    httpOptions?: any
  ): Observable<any> {
    const options = {
      ...httpOptions,
      headers: token
        ? new HttpHeaders({
            ...httpOptions?.headers,
            Authorization: 'Bearer YOUR_TOKEN_HERE',
          })
        : httpOptions?.headers,
      responseType: 'json' as const,
    };

    return this.httpClient.get(url, options);
  }
  getServices(url: string, token: boolean = false, httpOptions: any) {
    return this.httpClient.get(url, token && httpOptions);
  }
  putService(url: string, data: any, token: boolean = false, httpOptions: any) {
    return this.httpClient.put(url, data, token && httpOptions);
  }
  deleteService(
    url: string,
    data: any,
    token: boolean = false,
    httpOptions: any
  ) {
    return this.httpClient.delete(url, token && httpOptions);
  }
  patchService(
    url: string,
    data: any,
    token: boolean = false,
    httpOptions: any
  ) {
    return this.httpClient.patch(url, data, token && httpOptions);
  }
}
