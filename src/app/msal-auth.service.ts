import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


import * as Msal from 'msal';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class MsalAuthService {

  private app: any;

  constructor(private loading: LoadingService) {
    this.app = new Msal.UserAgentApplication(environment.clientID, null, () => {
      // LOG
      console.log('USER AGENT APPLICATION');
    });
  }

  public login() {
    return this.app.loginPopup(environment.graphScopes).then((token) => {
      const user = this.app.getUser();

      if (user) {
        // LOG
        console.log('AUTH LOGIN SUCCESS');

        return user;
      } else {
        // LOG
        console.error('AUTH LOGIN ERROR');

        return null;
      }
    }, (error) => {
      // LOG
      console.error('AUTH LOGIN ERROR');
      console.log(error);
      console.error(error);

      this.loading.dismiss();

      return null;
    });
  }

  public logout() {
    this.app.logout();
  }

  public fetchToken() {
    return this.app.acquireTokenSilent(environment.graphScopes).then((accessToken) => {
      // LOG
      console.log('AUTH FETCH TOKEN SUCCESS');

      return accessToken;
    }, (error) => {
      return this.app.acquireTokenPopup(environment.graphScopes).then((accessToken) => {
        // LOG
        console.error('AUTH FETCH TOKEN SUCCESS');

        return accessToken;
      }, (_error) => {
        // LOG
        console.error('AUTH FETCH TOKEN ERROR');
        console.error(_error);
      });
    });
  }
}
