import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminlogin',
  templateUrl: './adminlogin.component.html',
  styleUrls: ['./adminlogin.component.css']
})
export class AdminloginComponent {

  constructor(private loginService:LoginService,private router:Router) { }
  display=true
  username:string;
  password:string;
  logIn()
  {
    this.display=false
    this.loginService.doAdminLogin(this.username,this.password).subscribe((res)=>{
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
        this.router.navigate(['/admin/loaddata',res['username']])
      }
      this.display=true
    })
  }
}
