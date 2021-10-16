import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ListComponent } from './list/list.component';
import { HospitalComponent } from './hospital/hospital.component';
import { HotelComponent } from './hotel/hotel.component';
import { DoctorsComponent } from './doctors/doctors.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'list', component: ListComponent },
  { path: 'hospital', component: HospitalComponent },
  { path: 'hotel', component: HotelComponent },
  { path: 'doctors', component: DoctorsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterPartnerRoutingModule { }
