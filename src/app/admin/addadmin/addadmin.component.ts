import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisteradminService } from 'src/app/registeradmin.service';

@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.css']
})
export class AddadminComponent {

  constructor(private registerService:RegisteradminService,private router:Router) { }
  name:string;
  username:string;
  password:string;
  repassword:string;
  phno:string;
  rollno:string;
  dataAvailable=true;
  register()
  {
    this.dataAvailable=false;
    if(this.password!=this.repassword)
    {
      alert('passwords donot match')
      this.dataAvailable=true
    }
    else
    {
      let obj={};
    obj['name']=this.name
    obj['username']=this.username
    obj['password']=this.password
    obj['phno']=this.phno
    obj['rollno']=this.rollno.toString()
    obj['img']='https://res.cloudinary.com/duobggr1v/image/upload/v1594494852/defaultprofilepic/admin_snnnst.jpg'
    this.registerService.doRegister(obj).subscribe((res)=>{
      if(res['message']=='please login')
      {
        alert('please login')
        this.router.navigateByUrl('/home/adminlogin')
      }
      else if(res['message']=='please relogin')
      {
      alert('Session has expired please login')
      this.router.navigateByUrl('/home/adminlogin')
      }
      else if(res['message']==='username is already admin')
      {
        alert(res['message'])
      }
      else if(res['message']==='Roll number already registered')
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
        this.router.navigateByUrl('/admin/admindashboard/admindetails')
      }
      this.dataAvailable=true
    })
      
    }
  }
}
