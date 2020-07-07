import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{

  constructor(private loginService:LoginService,private router:Router) { }
  username:string;
  password:string;
  forgotPassword()
  {
    this.router.navigateByUrl('/forgotpassword')
  }
  logIn()
  {
    this.loginService.doUserLogin(this.username,this.password).subscribe((res)=>{
      if(res['message']==='Invalid credentials username')
      {
        alert('Invalid username')
      }
      else if(res['message']==='Invalid credentials password')
      {
        alert('Invalid password')
      }
      else
      {
        localStorage.setItem('token',res['webtoken'])
        this.router.navigate(['/user/userdashboard',res['username']])
      }
    })
  }
}
