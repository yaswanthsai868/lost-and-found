import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ReturnrejectService } from 'src/app/returnreject.service';

@Component({
  selector: 'app-uploaded-itemdetails',
  templateUrl: './uploaded-itemdetails.component.html',
  styleUrls: ['./uploaded-itemdetails.component.css']
})
export class UploadedItemdetailsComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient,private router:Router,private rejectService:ReturnrejectService) { }
  dataAvaliable=false
  itemDetails;
  isClaimed=false
  ngOnInit(): void {
    this.dataAvaliable=false
    this.activatedRoute.paramMap.subscribe(url=>{
      let Obj={_id:url.get('itemId')}
      this.http.post('/user/uploadeditemdetails',Obj).subscribe((res)=>{
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
        this.itemDetails=res['data']
        if(this.itemDetails.claimstatus=='Pending')
        {
          this.isClaimed=true
        }
      }
      this.dataAvaliable=true
      })
    })
  }
  returnItem()
  {
    localStorage.setItem('returnObj',JSON.stringify(this.itemDetails))
    this.router.navigateByUrl('/user/userdashboard/returnotp')
  }
  cancelReturn()
  {
    this.dataAvaliable=false
    let Obj={}
    Obj['_id']=this.itemDetails._id
    this.rejectService.doReject(Obj).subscribe((res)=>{
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
          alert('Claim request rejected successfully')
          this.router.navigateByUrl('/user/userdashboard/userdetails')
        }
        this.dataAvaliable=true
    })
  }

}
