import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdmindetailsComponent } from './admindetails/admindetails.component';
import { LoadDataComponent } from './load-data/load-data.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { RemoveadminComponent } from './removeadmin/removeadmin.component';
import { EditadmindetailsComponent } from './editadmindetails/editadmindetails.component';
import { ObjectstransactionComponent } from './objectstransaction/objectstransaction.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';


const routes: Routes = [
  {path:'loaddata/:username',component:LoadDataComponent},
  {path:'admindashboard',component:AdmindashboardComponent,children:[
    {path:'admindetails',component:AdmindetailsComponent},
    {path:'addadmin',component:AddadminComponent},
    {path:'removeadmin',component:RemoveadminComponent},
    {path:'editadmindetails',component:EditadmindetailsComponent},
    {path:'exchangedhistory',component:ObjectstransactionComponent},
    {path:'changepassword',component:ChangepasswordComponent},
    {path:'deleteuser',component:DeleteuserComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
