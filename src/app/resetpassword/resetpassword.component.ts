import { Component, OnInit } from '@angular/core';
import { ResetpasswordService } from '../resetpassword.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit{
  username:string;
  password:string;
  repassword:string;
  ngOnInit()
  {
    this.activeRouter.paramMap.subscribe((result)=>{
      this.username=result.get('username')
    })
  }
  constructor(private resetPasswordService:ResetpasswordService,private router:Router,private activeRouter:ActivatedRoute) { }
  changePassword()
  {
    if(this.password!==this.repassword)
    {
      alert('Entered passwords do not match')
    }
    else
    {
      let obj={}
      obj['username']=this.username
      obj['password']=this.password
      this.resetPasswordService.resetPassword(obj).subscribe((res)=>{
        alert(res['message'])
        this.router.navigateByUrl('/home')
      })
    }
  }

}
