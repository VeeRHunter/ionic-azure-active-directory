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
import { MsalAuthService } from '../msal-auth.service';


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
    HttpModule,
    RouterModule.forChild(routes)
  ],
  declarations: [LoginPage],
  providers: [
    MSAdal,
    LoadingService,
    ToastService,
    MsalAuthService,
  ]
})
export class LoginPageModule { }
