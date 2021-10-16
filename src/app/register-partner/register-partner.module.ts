import { NgModule } from '@angular/core';
import { CommonModule, NgIfContext } from '@angular/common';

import { RegisterPartnerRoutingModule } from './register-partner-routing.module';
import { ListComponent } from './list/list.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HospitalComponent } from './hospital/hospital.component';
import { HotelComponent } from './hotel/hotel.component';
import { DoctorsComponent } from './doctors/doctors.component';

@NgModule({
  declarations: [
    ListComponent,
    HospitalComponent,
    HotelComponent,
    DoctorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RegisterPartnerRoutingModule
  ]
})
export class RegisterPartnerModule { }
