import { Component, OnInit } from '@angular/core';
import { FindlostitemService } from 'src/app/findlostitem.service';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-findlostitem',
  templateUrl: './findlostitem.component.html',
  styleUrls: ['./findlostitem.component.css']
})
export class FindlostitemComponent implements OnInit {

  ngOnInit(){
    this.dataAvailable=false
    this.store.select('userData').subscribe(data=>{
      this.username=data.userData.username
      this.dataAvailable=true
    })

  }

  constructor(private router:Router,private store:Store<any>) { }
  dataAvailable=true;
  username;
  brand;
  model;
  contype;
  eartype;
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
  lostdate;
  lastseentime;
  losttime;
  findItem()
  {
    this.dataAvailable=false
    let lostObj={}
    lostObj['brand']=this.brand
    lostObj['model']=this.model
    lostObj['contype']=this.contype
    lostObj['eartype']=this.eartype
    lostObj['color']=this.color
    lostObj['buttons']=this.buttons
    lostObj['microphone']=this.microphone
    lostObj['lostdate']=this.lostdate.getDate()+'-'+(this.lostdate.getMonth()+1)+'-'+this.lostdate.getFullYear()
    lostObj['lastseentime']=this.lastseentime
    lostObj['type']=this.selectedType
    lostObj['username']=this.username
    localStorage.setItem('lostDetails',JSON.stringify(lostObj))
    this.router.navigateByUrl('/user/userdashboard/matchingitems')
    this.dataAvailable=true
  }

}
