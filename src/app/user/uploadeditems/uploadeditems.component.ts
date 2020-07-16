import { Component, OnInit } from '@angular/core';
import { GetuploadeditemsService } from 'src/app/getuploadeditems.service';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-uploadeditems',
  templateUrl: './uploadeditems.component.html',
  styleUrls: ['./uploadeditems.component.css']
})
export class UploadeditemsComponent implements OnInit {

  constructor(private uploadedDataService:GetuploadeditemsService,private store:Store<any>,private router:Router) { }
  dataAvailable=false
  uploadedObjects;
  ngOnInit(): void {
    this.dataAvailable=false
    this.store.select('userData').subscribe(data=>{
      let userObj={}
      userObj['username']=data.userData.username
      this.uploadedDataService.getUploadedItems(userObj).subscribe((res)=>{
        this.uploadedObjects=res['uploadedItems']
        this.dataAvailable=true
      })
    })
  }
  getdetails(ObjectData)
    {
      this.router.navigate(['/user/userdashboard/uploadeditemdetails',ObjectData._id])
    }
}
