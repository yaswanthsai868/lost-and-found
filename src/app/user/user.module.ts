import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { LoaddataComponent } from './loaddata/loaddata.component';
import {StoreModule} from '@ngrx/store'
import { userLoginReducer } from './userdata.reducer';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import {PanelModule} from 'primeng/panel';
import { UploadfounditemComponent } from './uploadfounditem/uploadfounditem.component';
import { UploadeditemsComponent } from './uploadeditems/uploadeditems.component';
import { FindlostitemComponent } from './findlostitem/findlostitem.component';
import { ModifydetailsComponent } from './modifydetails/modifydetails.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component'
import {FormsModule} from '@angular/forms'
import {DropdownModule} from 'primeng/dropdown'
import {InputTextModule} from 'primeng/inputtext'
import {CalendarModule} from 'primeng/calendar'
import {InputMaskModule} from 'primeng/inputmask'
import {CardModule} from 'primeng/card';
import { UploadedItemdetailsComponent } from './uploaded-itemdetails/uploaded-itemdetails.component';
import { DetailsmatchingComponent } from './detailsmatching/detailsmatching.component';
import { ReturnotpComponent } from './returnotp/returnotp.component'

@NgModule({
  declarations: [UserdashboardComponent, LoaddataComponent, UserdetailsComponent, UploadfounditemComponent, UploadeditemsComponent, FindlostitemComponent, ModifydetailsComponent, ChangepasswordComponent, UploadedItemdetailsComponent, DetailsmatchingComponent, ReturnotpComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    StoreModule.forFeature('userData',userLoginReducer),
    PanelModule,
    FormsModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
    InputMaskModule,
    CardModule
  ]
})
export class UserModule { }
