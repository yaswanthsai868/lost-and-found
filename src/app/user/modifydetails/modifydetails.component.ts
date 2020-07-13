import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { GetuserdetailsService } from 'src/app/getuserdetails.service';
import { userLoginAction } from '../userdata.action';
import { ChangeuserdetailsService } from 'src/app/changeuserdetails.service';

@Component({
  selector: 'app-modifydetails',
  templateUrl: './modifydetails.component.html',
  styleUrls: ['./modifydetails.component.css']
})
export class ModifydetailsComponent implements OnInit {

  constructor(private store:Store<any>,private detailsService:ChangeuserdetailsService,private router:Router,private getdetails:GetuserdetailsService) { }
  name;
  username;
  rollno;
  phno;
  dataAvailable=false;
  ngOnInit(): void {
    this.dataAvailable=false
    this.store.select('userData').subscribe(data=>{
      this.name=data.userData.name
      this.username=data.userData.username
      this.rollno=data.userData.rollno
      this.phno=data.userData.phno
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
        this.router.navigateByUrl('/home/login')
      }
      else if(res['message']=='please relogin')
      {
        alert('Session has expired please login')
        this.router.navigateByUrl('/home/login')
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
            this.router.navigateByUrl('/home/login')
          }
          else if(res['message']=='please relogin')
          {
            alert('Session has expired please login')
            this.router.navigateByUrl('/home/login')
          }
          else
          {
            this.store.dispatch(userLoginAction({userData:res['details']}))
            alert('Details have been changed')
            this.router.navigateByUrl('/user/userdashboard/userdetails')
          }
          })
      }
      this.dataAvailable=true
    })

  }


}
