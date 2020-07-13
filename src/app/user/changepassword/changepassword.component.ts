import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { UserchangepasswordService } from 'src/app/userchangepassword.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private store:Store<any>,private changePasswordService:UserchangepasswordService,private router:Router) { }
  dataAvailable=false;
  username;
  password;
  repassword;
  ngOnInit(): void {
    this.dataAvailable=false
    this.store.select('userData').subscribe(data=>{
      this.username=data.userData.username
      this.dataAvailable=true
    })
  }
  changePassword()
  {
    this.dataAvailable=false
    if(this.password!=this.repassword)
    {
      alert('Entered passwords do not match')
      this.dataAvailable=true
    }
    else
    {
      let userObj={}
      userObj['username']=this.username
      userObj['password']=this.password
      this.changePasswordService.changeUserPassword(userObj).subscribe(res=>{
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
        else if(res['message']=='You cannot keep the new password as the current password')
        {
          alert(res['message'])
        }
        else
        {
          localStorage.removeItem('token')
          alert(res['message'])
          this.router.navigateByUrl('/home/login')
        }
        this.dataAvailable=true
      })
    }
  }

}
