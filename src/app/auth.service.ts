import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
// import 'rxjs/add/operator/map';


let apiurl: string = "http://192.168.10.176/active-directory/index.php";


@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(public http: Http) { }


  postData(credentials) {
    // console.log(credentials);
    return new Promise((resolve, reject) => {

      this.http.post(apiurl, credentials).subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });

    });
  }

}
