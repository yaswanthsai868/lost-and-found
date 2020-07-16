import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GetadmindetailsService } from 'src/app/getadmindetails.service';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {

  
  constructor(private store:Store<any>,private router:Router) {}
  adminName;
  dataAvailable=false
  ngOnInit() {
    this.dataAvailable=false
    this.store.select('adminData').subscribe(data=>{
      this.adminName=data.adminData.name
      this.dataAvailable=true
    })
  }
  doLogOut()
  {
    localStorage.removeItem('token')
    this.router.navigateByUrl('/home/display')
  }

}
