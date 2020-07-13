import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {FormsModule} from '@angular/forms'
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { VerifyotpComponent } from './verifyotp/verifyotp.component';
import { HttpinterceptorService } from './httpinterceptor.service';
import {StoreModule} from '@ngrx/store';
import {PanelModule} from 'primeng/panel';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminloginComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    VerifyotpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    PanelModule
    
  ],
  providers: [
    {
      provide:HTTP_INTERCEPTORS,
      useClass:HttpinterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
