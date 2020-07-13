import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { userLoginAction } from '../userdata.action';
import { Router } from '@angular/router';
import { UploadprofilepicService } from 'src/app/uploadprofilepic.service';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {


  constructor(private store:Store<any>,private router:Router,private uploadService:UploadprofilepicService) { }
  dataAvaliable=false
  userDetails;
  ngOnInit(): void {
    this.dataAvaliable=false
    this.store.select('userData').subscribe(data=>{
      this.userDetails=data.userData
      this.dataAvaliable=true
    })
  }
  

}
