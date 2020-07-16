import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-transactiondetails',
  templateUrl: './transactiondetails.component.html',
  styleUrls: ['./transactiondetails.component.css']
})
export class TransactiondetailsComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private http:HttpClient,private router:Router) { }
  dataAvaliable=false
  itemDetails;
  uploaderDetails;
  claimerDetails;
  ngOnInit(): void {
    this.dataAvaliable=false
    this.activatedRoute.paramMap.subscribe(url=>{
      let Obj={_id:url.get('transactionId')}
      this.http.post('/admin/transactiondetails',Obj).subscribe((res)=>{
        if(res['message']=='please login')
        {
          alert('please login')
          this.router.navigateByUrl('/home/adminlogin')
        }
        else if(res['message']=='please relogin')
        {
          alert('Session has expired please login')
          this.router.navigateByUrl('/home/adminlogin')
        }
        else
        {
          this.itemDetails=res['claimedItem']
          this.uploaderDetails=res['uploadedUser']
          this.claimerDetails=res['claimedUser']
        }
        this.dataAvaliable=true
      })
    })
  }

}
