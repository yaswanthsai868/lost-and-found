import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GettransactionsService } from 'src/app/gettransactions.service';

@Component({
  selector: 'app-objectstransaction',
  templateUrl: './objectstransaction.component.html',
  styleUrls: ['./objectstransaction.component.css']
})
export class ObjectstransactionComponent implements OnInit {

  constructor(private router:Router,private transactionService:GettransactionsService) { }
  dataAvailable=false
  exchangedObjects;
  ngOnInit(): void {
    this.dataAvailable=false
    this.transactionService.getTransactions().subscribe(res=>{
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
          this.exchangedObjects=res['data']
        }
      this.dataAvailable=true
    })
    
  }
  getdetails(ObjectData)
    {
      this.router.navigate(['/admin/admindashboard/transactiondetails',ObjectData._id])
    }

}
