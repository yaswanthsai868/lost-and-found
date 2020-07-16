import { Component, OnInit } from '@angular/core';
import { FindlostitemService } from 'src/app/findlostitem.service';
import { Router } from '@angular/router';
import { ClaimitemService } from 'src/app/claimitem.service';

@Component({
  selector: 'app-detailsmatching',
  templateUrl: './detailsmatching.component.html',
  styleUrls: ['./detailsmatching.component.css']
})
export class DetailsmatchingComponent implements OnInit {

  constructor(private mathcingService:FindlostitemService,private router:Router,private claimService:ClaimitemService) { }
  dataAvailable;
  uploadedObjects;
  lostObj;
  ngOnInit(): void {
    this.dataAvailable=false
    this.lostObj=JSON.parse(localStorage.getItem('lostDetails'))
    localStorage.removeItem('lostDetails')
    this.mathcingService.lostItem(this.lostObj).subscribe((res)=>{
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
        else if(res['message']=='No such Items found')
        {
          alert('Your object has been found yet,Please try again later')
          this.uploadedObjects=res['data']
        }
        else
        {
          this.uploadedObjects=res['data']
        }
        this.dataAvailable=true
    })
  }
  claimItem(Obj)
  {
    this.dataAvailable=false
    let claimDetails={}
    claimDetails['_id']=Obj._id
    claimDetails['username']=this.lostObj.username
    claimDetails['uploadedBy']=Obj.uploadedBy
    this.claimService.claimItem(claimDetails).subscribe((res)=>{
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
        alert('The details of person having the item is sent to your mail. Along with the otp required at the time exchange')
        this.router.navigateByUrl('/user/userdashboard/userdetails')
      }
      this.dataAvailable=true
    })
  }

}
