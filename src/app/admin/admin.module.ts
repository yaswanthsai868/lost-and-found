import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { AdmindetailsComponent } from './admindetails/admindetails.component';
import {PanelModule} from 'primeng/panel';
import { LoadDataComponent } from './load-data/load-data.component';
import { StoreModule } from '@ngrx/store';
import { loginReducer } from './load-data/login.reducer';
import { AddadminComponent } from './addadmin/addadmin.component';
import { RemoveadminComponent } from './removeadmin/removeadmin.component';
import { EditadmindetailsComponent } from './editadmindetails/editadmindetails.component';
import { ObjectstransactionComponent } from './objectstransaction/objectstransaction.component';
import {FormsModule} from '@angular/forms';
import { DeleteuserComponent } from './deleteuser/deleteuser.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { TransactiondetailsComponent } from './transactiondetails/transactiondetails.component'
import {CardModule, Card} from 'primeng/card'


@NgModule({
  declarations: [AdmindashboardComponent, AdmindetailsComponent, LoadDataComponent, AddadminComponent, RemoveadminComponent, EditadmindetailsComponent, ObjectstransactionComponent, DeleteuserComponent, ChangepasswordComponent, TransactiondetailsComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ProgressSpinnerModule,
    PanelModule,
    StoreModule.forFeature('adminData',loginReducer),
    FormsModule,
    CardModule
  ]
})
export class AdminModule { }
