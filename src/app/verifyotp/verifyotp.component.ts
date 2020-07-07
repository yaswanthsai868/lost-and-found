import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VerifyotpService } from '../verifyotp.service';
import { ForgotpasswordserviceService } from '../forgotpasswordservice.service';

@Component({
  selector: 'app-verifyotp',
  templateUrl: './verifyotp.component.html',
  styleUrls: ['./verifyotp.component.css']
})
export class VerifyotpComponent implements OnInit{

  constructor(private activatedroute:ActivatedRoute,private verifyOtpService:VerifyotpService,
    private forgotPasswordService:ForgotpasswordserviceService,private router:Router) { }
  username:string;
  otp:string;
  ngOnInit()
  {
    this.activatedroute.paramMap.subscribe((result)=>{
      this.username=result.get('username')
    })
  }
  resendOtp()
  {
    this.forgotPasswordService.requestOtp(this.username).subscribe((res)=>{
      if(res['message']==='user not found')
      {
        alert('Please enter valid username')
        this.router.navigateByUrl('./forgotpassword')

      }
      else
      {
        alert('New Otp has been sent to your mail')
      }
    })
  }
  verifyOtp()
  {
    let obj={};
    obj['username']=this.username
    obj['otp']=this.otp
    this.verifyOtpService.verify(obj).subscribe((res)=>{
      if(res['message']==='Otp has been expired')
      {
        this.resendOtp();
      }
      else if(res['message']==='Incorrect Otp')
      {
        alert('Please enter correct password')
      }
      else
      {
        alert(res['message'])
        this.router.navigate(['./resetpassword',this.username])
      }
    })
  }

}
