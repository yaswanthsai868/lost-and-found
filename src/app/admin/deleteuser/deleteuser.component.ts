import { Component, OnInit } from '@angular/core';
import { DeleteuserService } from 'src/app/deleteuser.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-deleteuser',
  templateUrl: './deleteuser.component.html',
  styleUrls: ['./deleteuser.component.css']
})
export class DeleteuserComponent{

  constructor(private deleteUserService:DeleteuserService,private router:Router) { }
  username;
  dataAvailable=true
  deleteAdmin()
  {
    this.dataAvailable=false
      this.deleteUserService.removeUser(this.username).subscribe(res=>{
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
        else if(res['message']=='username invalid')
        {
          alert('Invalid user Email')
        } 
        else{
          alert(res['message']) 
        }
        this.dataAvailable=true
      })

  }

}
