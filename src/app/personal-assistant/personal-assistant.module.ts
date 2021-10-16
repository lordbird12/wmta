import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonalAssistantRoutingModule } from './personal-assistant-routing.module';
import { FormComponent } from './form/form.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    FormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PersonalAssistantRoutingModule
  ]
})
export class PersonalAssistantModule { }
