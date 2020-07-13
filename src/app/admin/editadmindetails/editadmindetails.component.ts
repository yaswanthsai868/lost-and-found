import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { ChangeadmindetailsService } from 'src/app/changeadmindetails.service';
import { RouteReuseStrategy, Router } from '@angular/router';
import { loginAction } from '../load-data/login.action';
import { GetadmindetailsService } from 'src/app/getadmindetails.service';

@Component({
  selector: 'app-editadmindetails',
  templateUrl: './editadmindetails.component.html',
  styleUrls: ['./editadmindetails.component.css']
})
export class EditadmindetailsComponent implements OnInit {

  constructor(private store:Store<any>,private detailsService:ChangeadmindetailsService,private router:Router,private getdetails:GetadmindetailsService) { }
  name;
  username;
  rollno;
  phno;
  dataAvailable=false;
  ngOnInit(): void {
    this.dataAvailable=false
    this.store.select('adminData').subscribe(data=>{
      this.name=data.adminData.name
      this.username=data.adminData.username
      this.rollno=data.adminData.rollno
      this.phno=data.adminData.phno
      this.dataAvailable=true
    })
  }
  changeDetails()
  {
    this.dataAvailable=false
    let modifyDetails={}
    modifyDetails['name']=this.name
    modifyDetails['username']=this.username
    modifyDetails['rollno']=this.rollno
    modifyDetails['phno']=this.phno
    this.detailsService.modifyDetails(modifyDetails).subscribe(res=>{
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
      else if(res['message']=='Phone number already registered')
      {
        alert('Phone number already registered');
      }
      else if(res['message']=='Roll number already registered')
      {
        alert('Roll number already registered')
      }
      else
      {
        this.getdetails.getName(this.username).subscribe(res=>{
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
          else
          {
            this.store.dispatch(loginAction({adminObj:res['details']}))
            alert('Details have been changed')
            this.router.navigateByUrl('/admin/admindashboard/admindetails')
          }
          })
      }
      this.dataAvailable=true
    })

  }

}
