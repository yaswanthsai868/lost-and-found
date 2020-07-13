import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  constructor(private store:Store<any>,private router:Router) {}
  userName;
  dataAvailable=false
  ngOnInit() {
    this.dataAvailable=false
    this.store.select('userData').subscribe(data=>{
      this.userName=data.userData.name
      this.dataAvailable=true
    })
  }
  doLogOut()
  {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/home')
  }

}
