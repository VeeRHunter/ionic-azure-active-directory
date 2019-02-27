import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { LoginPage } from './login.page';

import { MSAdal } from '@ionic-native/ms-adal/ngx';

import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { LoadingService } from '../loading.service';
import { ToastService } from '../toast.service';

import { MsAdalAngular6Module } from 'microsoft-adal-angular6';
import { AuthenticationGuard } from 'microsoft-adal-angular6';

const routes: Routes = [
  {
    path: '',
    component: LoginPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    MsAdalAngular6Module.forRoot({
      tenant: '56f677ed-ab0d-4f36-8dad-f20db89d4bd4',
      clientId: 'b2623207-50a6-4b64-af52-2af7e4b4b5df',
      redirectUri: 'http://localhost:8000',
      endpoints: {
        "http://localhost:8000/index.html": "b2623207-50a6-4b64-af52-2af7e4b4b5df"
      },
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage',
    }),
    HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
  providers: [
    MSAdal,
    LoadingService,
    ToastService,
    AuthenticationGuard,
  ]
})
export class LoginPageModule { }
