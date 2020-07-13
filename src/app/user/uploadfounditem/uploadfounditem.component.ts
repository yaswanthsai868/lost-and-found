import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uploadfounditem',
  templateUrl: './uploadfounditem.component.html',
  styleUrls: ['./uploadfounditem.component.css']
})
export class UploadfounditemComponent implements OnInit {

  constructor() { }
  selectedType;
  type=[
    {label:'Earphones',value:'earphone'},
    {label:'Mobile Charger',value:'mobilecharger'},
    {label:'Mobile',value:'mobile'},
    {label:'Pendrive or Hard drive',value:'drives'},
    {label:'Bike keys',value:'bkeys'},
    {label:'Spectacles',value:'specs'},
    {label:'Water Bottles',value:'bottles'},
    {label:'Books',value:'books'},
    {label:'Watch',value:'watch'},
    {label:'Power Bank',value:'powerbank'},
    {label:'Laptop',value:'laptop'},
    {label:'Wallet',value:'wallet'},
    {label:'Bag or purse',value:'bag'},
    {label:'Lunch Box',value:'lunchbox'},
    {label:'Cables',values:'cables'}
  ]
  ngOnInit(): void {
  }

}
