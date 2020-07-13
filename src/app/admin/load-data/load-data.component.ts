import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetadmindetailsService } from 'src/app/getadmindetails.service';
import {Store} from '@ngrx/store'
import { loginAction } from './login.action';

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.css']
})
export class LoadDataComponent implements OnInit {

  username;
  constructor(private routeActive:ActivatedRoute,private adminDataService:GetadmindetailsService,private router:Router,private store:Store<any>) { }

  ngOnInit(): void {
    this.routeActive.paramMap.subscribe(urlData=>{
      this.username=urlData.get('username')
      this.adminDataService.getName(this.username).subscribe(res=>{
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
        else
        {
          this.store.dispatch(loginAction({adminObj:res['details']}))
          this.router.navigateByUrl('/admin/admindashboard/admindetails')
        }
      })
    })
  }

}
