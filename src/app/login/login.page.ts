import { Component, OnInit } from '@angular/core';

import { MSAdal, AuthenticationContext, AuthenticationResult } from '@ionic-native/ms-adal/ngx';


import { Http, Headers, ResponseContentType } from '@angular/http';
import { DomSanitizer } from '@angular/platform-browser';
import { LoadingService } from '../loading.service';
import { ToastService } from '../toast.service';
import { AuthService } from '../auth.service';
import { NavController, Platform } from '@ionic/angular';
import { MsAdalAngular6Service } from 'microsoft-adal-angular6';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  public imageBase64: any;

  public fullDataState = false;
  public photoState = false;
  public managerState = false;
  public contactState = false;

  private fullData: any;
  private managerData: any;
  private contactData: any;

  private tokenData: any;

  private loginData = {
    'firstName': '',
    'lastName': '',
    'profileImage': '',
    'email': '',
    'mail': '',
    'jobTitle': '',
    'Department': '',
    'Manager': '',
    'userId': '',
    'street': '',
    'state': '',
    'region': '',
    'office': '',
    'city': '',
    'postal': '',
    'officePhone': '',
    'mobilePhone': '',
    'phone': '',
    'Email': '',
    'alternatePhone': '',
    'alternateEmail': '',
    'apiState': 'activeLogin'
  }

  constructor(
    private msAdal: MSAdal,
    private http: Http,
    private loading: LoadingService,
    private toast: ToastService,
    private auth: AuthService,
    private navCtrl: NavController,
    private platform: Platform,
    private webASAD: MsAdalAngular6Service,
  ) {
  }

  ngOnInit() {
    if (!this.platform.is("mobile")) {
      if (this.webASAD.userInfo != null) {
        // this.webASAD.logout();
      }
    }
    if (localStorage.getItem('newLogin') == 'start') {
      localStorage.setItem('newLogin', '');
      console.log(this.webASAD.userInfo);
      var token = this.webASAD.acquireToken('b2623207-50a6-4b64-af52-2af7e4b4b5df').subscribe((token: string) => {
        console.log('saved Login');
        console.log(token);
        this.tokenData = token;
      });
    }
  }

  loginActive() {

    this.fullDataState = false;
    this.photoState = false;
    this.managerState = false;

    // this.auth.login();

    // https://dev-ut6spngh.auth0.com/api/v2/

    if (this.platform.is("mobile")) {

      let authContext: AuthenticationContext = this.msAdal.createAuthenticationContext('https://login.windows.net/common');


      this.loading.present();

      // b2623207-50a6-4b64-af52-2af7e4b4b5df  impact_it@outlook.com
      // https://outlook.office365.com/
      authContext.acquireTokenAsync('https://graph.windows.net', 'b2623207-50a6-4b64-af52-2af7e4b4b5df', 'http://localhost/home', "", "")
        .then((authResponse: AuthenticationResult) => {
          console.log(authResponse);
          console.log('Token is', authResponse.accessToken);
          console.log('Token will expire on', authResponse.expiresOn);

          const httpheader = new Headers();
          httpheader.append('Authorization', authResponse.accessToken);
          httpheader.append('Content-Type', 'application/json');


          this.http.get('https://graph.windows.net/me?api-version=1.6', { headers: httpheader }).toPromise()
            .then((result: any) => {
              console.log(JSON.parse(result._body));
              this.fullData = JSON.parse(result._body);
              this.fullDataState = true;
            }, error => {
              console.error(error);
              this.fullDataState = true;
            });


          this.http.get('https://graph.windows.net/me/manager?api-version=1.6', { headers: httpheader }).toPromise()
            .then((result: any) => {
              console.log(JSON.parse(result._body));
              this.managerData = JSON.parse(result._body);
              this.managerState = true;
            }, error => {
              console.error(error);
              this.managerState = true;
            });

          this.http.get('https://graph.windows.net/me/thumbnailPhoto?api-version=1.6',
            { headers: httpheader, responseType: ResponseContentType.Blob }).toPromise()
            .then((res: any) => {
              this.photoState = true;
              let blob = new Blob([res._body], {
                type: res.headers.get("Content-Type")
              });

              var reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = () => {
                this.imageBase64 = reader.result;
              }
            });

          this.callServer();
        })
        .catch((e: any) => {
          console.error(e);
          console.log(e);
          console.log('Authentication failed', e);
          this.loading.dismiss();
        });
    } else {

      console.log(this.webASAD.userInfo);

      if (this.webASAD.userInfo == null) {
        this.webASAD.login();
        console.log('New Login');
        localStorage.setItem('newLogin', 'start');
      } else {
        console.log('Old Login');
        var token = this.webASAD.acquireToken('b2623207-50a6-4b64-af52-2af7e4b4b5df').subscribe((token: string) => {
          console.log('Old Login');
          console.log(token);
          this.tokenData = token;
        });
        // this.tokenData = this.webASAD.RenewToken('2ef88888-99c5-4e91-89db-4cabe6ae661d');
        // console.log(this.webASAD.RenewToken('2ef88888-99c5-4e91-89db-4cabe6ae661d'));
      }
    }
  }

  getUserData() {
    const httpheader = new Headers();
    httpheader.append('Authorization', this.tokenData);
    httpheader.append('Content-Type', 'application/json');


    this.http.get('https://graph.windows.net/me?api-version=1.6', { headers: httpheader }).toPromise()
      .then((result: any) => {
        console.log(JSON.parse(result._body));
        this.fullData = JSON.parse(result._body);
        this.fullDataState = true;
      }, error => {
        console.error(error);
        this.fullDataState = true;
      });


    this.http.get('https://graph.windows.net/me/manager?api-version=1.6', { headers: httpheader }).toPromise()
      .then((result: any) => {
        console.log(JSON.parse(result._body));
        this.managerData = JSON.parse(result._body);
        this.managerState = true;
      }, error => {
        console.error(error);
        this.managerState = true;
      });

    this.http.get('https://graph.windows.net/me/thumbnailPhoto?api-version=1.6',
      { headers: httpheader, responseType: ResponseContentType.Blob }).toPromise()
      .then((res: any) => {
        this.photoState = true;
        let blob = new Blob([res._body], {
          type: res.headers.get("Content-Type")
        });

        var reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          this.imageBase64 = reader.result;
        }
      });

    this.callServer();
  }

  callServer() {
    if (this.fullDataState && this.photoState && this.managerState) {
      this.loginData.firstName = this.fullData.displayName.split(' ')[0];
      this.loginData.lastName = this.fullData.displayName.split(' ')[1];
      if (this.imageBase64 != null && typeof (this.imageBase64) != 'undefined') {
        this.loginData.profileImage = this.imageBase64;
      } else {
        this.loginData.profileImage = '';
      }
      if (this.fullData.otherMails.length > 0) {
        this.loginData.email = this.fullData.otherMails[0];
      } else {
        this.loginData.email = '';
      }
      this.loginData.mail = this.fullData.mail;
      this.loginData.mail = this.fullData.mail;
      this.loginData.jobTitle = this.fullData.jobTitle;
      this.loginData.Department = this.fullData.department;
      if (this.managerData != null && typeof (this.managerData) != 'undefined') {
        this.loginData.Manager = this.managerData.displayName;
      } else {
        this.loginData.Manager = '';
      }
      this.loginData.userId = this.fullData.objectId;
      this.loginData.street = this.fullData.streetAddress;
      this.loginData.state = this.fullData.state;
      this.loginData.region = this.fullData.country;
      this.loginData.office = this.fullData.physicalDeliveryOfficeName;
      this.loginData.city = this.fullData.city;
      this.loginData.postal = this.fullData.postalCode;
      this.loginData.officePhone = this.fullData.telephoneNumber;
      this.loginData.mobilePhone = this.fullData.mobile;
      this.loginData.phone = this.fullData.physicalDeliveryOfficeName;
      this.loginData.Email = this.fullData.physicalDeliveryOfficeName;
      this.loginData.alternatePhone = this.fullData.physicalDeliveryOfficeName;
      this.loginData.alternateEmail = this.fullData.physicalDeliveryOfficeName;

      this.auth.postData(this.loginData).then(result => {
        console.log(result);
        localStorage.setItem('loginData', JSON.stringify(this.loginData));
        this.navCtrl.navigateForward('home');
        this.loading.dismiss();
      }, error => {
        console.log(error);
        this.loading.dismiss();
      })
    } else {
      setTimeout(() => {
        this.callServer();
      }, 500);
    }
  }

}
