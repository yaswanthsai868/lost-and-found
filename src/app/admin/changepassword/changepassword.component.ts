import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AdminchangepasswordService } from 'src/app/adminchangepassword.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {

  constructor(private store:Store<any>,private changePasswordService:AdminchangepasswordService,private router:Router) { }
  dataAvailable=false;
  username;
  password;
  repassword;
  ngOnInit(): void {
    this.dataAvailable=false
    this.store.select('adminData').subscribe(data=>{
      this.username=data.adminData.username
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
      let adminObj={}
      adminObj['username']=this.username
      adminObj['password']=this.password
      this.changePasswordService.changeAdminPassword(adminObj).subscribe(res=>{
        if(res['message']=='please login')
        {
          alert('Please login');
          this.router.navigateByUrl('/home/adminlogin')
        }
        else if(res["message"]=='please relogin')
        {
          alert('Session expired please login again')
          this.router.navigateByUrl('/home/adminlogin')
        }
        else if(res['message']=='You cannot keep the new password as the current password')
        {
          alert(res['message'])
        }
        else
        {
          localStorage.removeItem('token')
          alert(res['message'])
          this.router.navigateByUrl('/home/adminlogin')
        }
        this.dataAvailable=true
      })
    }
  }
}
