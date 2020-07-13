import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../register.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(private registerService:RegisterService,private router:Router) { }
  name:string;
  username:string;
  password:string;
  repassword:string;
  phno:string;
  rollno:string;
  display=true
  register()
  {
    this.display=false
    if(this.password!=this.repassword)
    {
      alert('passwords donot match')
      this.display=true
    }
    else
    {
      let obj={};
    obj['name']=this.name
    obj['username']=this.username
    obj['password']=this.password
    obj['phno']=this.phno
    obj['rollno']=this.rollno.toString()
    obj['img']='https://res.cloudinary.com/duobggr1v/image/upload/v1594493943/defaultprofilepic/user_hku7jy.jpg'
    this.registerService.doRegister(obj).subscribe((res)=>{
      if(res['message']==='username already exists')
      {
        alert(res['message'])
      }
      else if(res['message']==='Roll number already exists')
      {
        alert('Roll no already registered try to recover your account')
      }
      else if(res['message']==='Phone number already registered')
      {
        alert(res['message'])
      }
      else
      {
        alert(res['message'])
        this.router.navigateByUrl('/home/login')
      }
      this.display=true
    })
      
    }
  }
}
