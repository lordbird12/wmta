import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElderlyCareRoutingModule } from './elderly-care-routing.module';
import { ListComponent } from './list/list.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ElderlyCareRoutingModule
  ]
})
export class ElderlyCareModule { }
