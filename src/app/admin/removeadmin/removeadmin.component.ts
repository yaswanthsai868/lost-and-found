import { Component, OnInit } from '@angular/core';
import { DeleteadminService } from 'src/app/deleteadmin.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-removeadmin',
  templateUrl: './removeadmin.component.html',
  styleUrls: ['./removeadmin.component.css']
})
export class RemoveadminComponent implements OnInit {

  constructor(private deleteAdminService:DeleteadminService,private router:Router,private store:Store<any>) { }
  username;
  currentUser;
  dataAvailable=false;
  ngOnInit(): void {
    this.dataAvailable=false
    this.store.select('adminData').subscribe(data=>{
      this.currentUser=data.adminData.username
      this.dataAvailable=true
    })
  }
  deleteAdmin()
  {
    this.dataAvailable=false
    if(this.currentUser==this.username)
    {
      alert('You cannot delete your own account')
      this.dataAvailable=false
    }
    else
    {
      this.deleteAdminService.removeAdmin(this.username).subscribe(res=>{
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
        else if(res['message']=='Account is not an admin account')
        {
          alert('Invalid admin Email')
        } 
        else{
          alert(res['message']) 
        }
        this.dataAvailable=true
      })
    }
  }
}
