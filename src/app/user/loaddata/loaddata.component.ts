import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetuserdetailsService } from 'src/app/getuserdetails.service';
import { userLoginAction } from '../userdata.action';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-loaddata',
  templateUrl: './loaddata.component.html',
  styleUrls: ['./loaddata.component.css']
})
export class LoaddataComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private userDataService:GetuserdetailsService,private router:Router,private store:Store<any>) { }
  username;
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(urlData=>{
      this.username=urlData.get('username')
      this.userDataService.getName(this.username).subscribe(res=>{
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
        else
        {
          this.store.dispatch(userLoginAction({userData:res['details']}))
          this.router.navigateByUrl('/user/userdashboard/userdetails')
        }
      })
    })

  }

}
