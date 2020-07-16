import { Component, OnInit } from '@angular/core';
import { ReturnrejectService } from 'src/app/returnreject.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-returnotp',
  templateUrl: './returnotp.component.html',
  styleUrls: ['./returnotp.component.css']
})
export class ReturnotpComponent implements OnInit {
  otp;
  verifying;
  username;
  _id;
  constructor(private returnService:ReturnrejectService,private router:Router) { }

  ngOnInit(): void {
    this.verifying=false;
    let object=JSON.parse(localStorage.getItem('returnObj'))
    localStorage.removeItem('returnObj')
    this.username=object.uploadedBy
    this._id=object._id
    this.verifying=true
  }
  verifyOtp()
  {
    this.verifying=false
    let Obj={};
    Obj['_id']=this._id
    Obj['uploadedBy']=this.username
    Obj['otp']=this.otp
    this.returnService.doReturn(Obj).subscribe((res)=>{
      if(res['message']=='please login')
        {
          alert('Please login');
          this.router.navigateByUrl('/home/login')
        }
        else if(res["message"]=='please relogin')
        {
          alert('Session expired please login again')
          this.router.navigateByUrl('/home/login')
        }
        else if(res['message']=='Please enter correct Otp')
        {
          alert(res["message"])
        }
        else
        {
          alert(res['message'])
          this.router.navigateByUrl('/user/userdashboard/userdetails')
        }
        this.verifying=true
    })
  }
  resendOtp()
  {
    this.verifying=false
    let Obj={};
    Obj['_id']=this._id
    return this.returnService.resendOtp(Obj).subscribe((res)=>{
      if(res['message']=='please login')
        {
          alert('Please login');
          this.router.navigateByUrl('/home/login')
        }
        else if(res["message"]=='please relogin')
        {
          alert('Session expired please login again')
          this.router.navigateByUrl('/home/login')
        }
        else
        {
          alert(res['message'])
        }
        this.verifying=true
    })
  }

}
