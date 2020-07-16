import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { VerifyotpComponent } from './verifyotp/verifyotp.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { BackgroungComponent } from './backgroung/backgroung.component';


const routes: Routes = [
  {path:'',pathMatch:'full',redirectTo:'/home/display'},
  {path:'home',component:HomeComponent,children:[
    {path:'display',component:BackgroungComponent},
    {path:'login',component:LoginComponent},
    {path:'register',component:RegisterComponent},
    {path:'adminlogin',component:AdminloginComponent},
    {path:'forgotpassword',component:ForgotpasswordComponent},
    {path:'verifyotp/:username',component:VerifyotpComponent},
    {path:'resetpassword/:username',component:ResetpasswordComponent}
]},
  {path:'user',loadChildren:'./user/user.module#UserModule'},
  {path:'admin',loadChildren:'./admin/admin.module#AdminModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
