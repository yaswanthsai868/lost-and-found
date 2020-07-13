import { Component, OnInit } from '@angular/core';
import { ForgotpasswordserviceService } from '../forgotpasswordservice.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent{

  username:string;
  otpSent=true
  constructor(private forgotPasswordService:ForgotpasswordserviceService,private router:Router) { }
  resetPassword()
  {
    this.otpSent=false
    this.forgotPasswordService.requestOtp(this.username).subscribe((res)=>{
      if(res['message']==='user not found')
      {
        alert('Please enter valid username')
      }
      else
      {
        alert('Otp has been sent to your mail')
        this.router.navigate(['/home/verifyotp',res['username']])
      }
      this.otpSent=true
    })
  }
}
