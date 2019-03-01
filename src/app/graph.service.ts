import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, ResponseContentType } from '@angular/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { promise } from 'protractor';
import { resolve } from 'q';

@Injectable({
  providedIn: 'root'
})
export class GraphService {
  constructor(
    private http: Http
  ) {

  }

  fetch(token: string) {
    const headers: Headers = new Headers({
      'Authorization': `Bearer ${token}`
    });

    // const headers = new Headers();
    // headers.append('Authorization', token);
    // headers.append('Content-Type', 'application/json');

    const options: RequestOptions = new RequestOptions({
      headers: headers
    });

    const url: string = `${environment.graphUrl}/me`;

    return this.http.get(url, options).subscribe(result => {
      console.log(result);
    }, error => {
      console.log(error);
    })
  }
}
