import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-admindetails',
  templateUrl: './admindetails.component.html',
  styleUrls: ['./admindetails.component.css']
})
export class AdmindetailsComponent implements OnInit {

  constructor(private store:Store<any>) { }

  dataAvaliable=false
  adminDetails
  ngOnInit(): void {
    this.dataAvaliable=false
    this.store.select('adminData').subscribe(data=>{
      this.adminDetails=data.adminData
      this.dataAvaliable=true
    })
  }

}
