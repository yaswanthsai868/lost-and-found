import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.css']
})
export class UserdetailsComponent implements OnInit {


  constructor(private store:Store<any>) { }
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
