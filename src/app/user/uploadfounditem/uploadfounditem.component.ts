import { Component, OnInit } from '@angular/core';
import { UploadfounditemService } from 'src/app/uploadfounditem.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-uploadfounditem',
  templateUrl: './uploadfounditem.component.html',
  styleUrls: ['./uploadfounditem.component.css']
})
export class UploadfounditemComponent  implements OnInit{

  ngOnInit(){
    this.dataAvailable=false
    this.store.select('userData').subscribe(data=>{
      this.uploadedBy=data.userData.username
      this.dataAvailable=true
    })
  }

  constructor(private uploadService:UploadfounditemService,private router:Router,private store:Store<any>) { }
  uploadedBy;
  dataAvailable=true;
  brand;
  model;
  contype;
  eartype;
  claimed=false;
  ctype=[
    {label:'Wired',value:'Wired'},
    {label:'Wireless',value:'Wireless'}
  ];
  etype=[
    {label:'Over Ear',value:'Over Ear'},
    {label:'Inside Ear',value:'Inside Ear'},
    {label:'Ear Buds',value:'Ear Buds'}
  ];
  micro=[
    {label:'Yes',value:'yes'},
    {label:'No',value:'no'}
  ];
  selectedType='Ear phones'
  color;
  buttons;
  microphone;
  founddate;
  foundtime;
  imageloaded;
  photofile;
  readImage(event)
  {
    this.dataAvailable=false
    let file=new FileReader();
    this.photofile=event.target.files[0]
    file.readAsDataURL(event.target.files[0])
    file.onload=()=>{
      this.imageloaded=file.result
      this.dataAvailable=true
    }
  }
  uploadItem()
  {
    this.dataAvailable=false
    let foundObj={}
    foundObj['brand']=this.brand
    foundObj['model']=this.model
    foundObj['contype']=this.contype
    foundObj['eartype']=this.eartype
    foundObj['color']=this.color
    foundObj['buttons']=this.buttons
    foundObj['microphone']=this.microphone
    foundObj['founddate']=this.founddate.getDate()+'-'+(this.founddate.getMonth()+1)+'-'+this.founddate.getFullYear()
    foundObj['foundtime']=this.foundtime
    foundObj['type']=this.selectedType
    foundObj['uploadedBy']=this.uploadedBy
    foundObj['claimed']=this.claimed
    foundObj['claimstatus']='Not Claimed'
    let foundData=new FormData()
    foundData.append('images',this.photofile)
    foundData.append('data',JSON.stringify(foundObj))
    this.uploadService.uploadItem(foundData).subscribe((res)=>{
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
      else if(res['message']=='found Item uploaded Successfully')
      {
        alert('Found Item uploaded successfully')
        this.router.navigateByUrl('/user/userdashboard/uploadeditems')
      }
      else
      {
        alert(`error while uploading the product ${res['message']}`)
      }
      this.dataAvailable=true
    })
  }

}
