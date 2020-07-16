import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import {LoaddataComponent} from './loaddata/loaddata.component'
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { UploadeditemsComponent } from './uploadeditems/uploadeditems.component';
import { UploadfounditemComponent } from './uploadfounditem/uploadfounditem.component';
import { FindlostitemComponent } from './findlostitem/findlostitem.component';
import { ModifydetailsComponent } from './modifydetails/modifydetails.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { UploadedItemdetailsComponent } from './uploaded-itemdetails/uploaded-itemdetails.component';
import { DetailsmatchingComponent } from './detailsmatching/detailsmatching.component';
import { ReturnotpComponent } from './returnotp/returnotp.component';



const routes: Routes = [
  {path:'loaddata/:username',component:LoaddataComponent},
  {path:'userdashboard',component:UserdashboardComponent,children:[
    {path:'userdetails',component:UserdetailsComponent},
    {path:'uploaditem',component:UploadfounditemComponent},
    {path:'uploadeditems',component:UploadeditemsComponent},
    {path:'finditems',component:FindlostitemComponent},
    {path:'modifydetails',component:ModifydetailsComponent},
    {path:'changepassword',component:ChangepasswordComponent},
    {path:'uploadeditemdetails/:itemId',component:UploadedItemdetailsComponent},
    {path:'matchingitems',component:DetailsmatchingComponent},
    {path:'returnotp',component:ReturnotpComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
