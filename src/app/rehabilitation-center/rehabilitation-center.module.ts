import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RehabilitationCenterRoutingModule } from './rehabilitation-center-routing.module';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RehabilitationCenterRoutingModule
  ]
})
export class RehabilitationCenterModule { }
