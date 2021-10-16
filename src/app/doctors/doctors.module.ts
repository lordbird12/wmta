import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorsRoutingModule } from './doctors-routing.module';
import { ListComponent } from './list/list.component';
import { I18nModule } from '../i18n/i18n.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DoctorsRoutingModule,
    I18nModule
  ]
})
export class DoctorsModule { }
