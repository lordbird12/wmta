import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConciergeServiceRoutingModule } from './concierge-service-routing.module';
import { PersonalAssistantComponent } from './personal-assistant/personal-assistant.component';
import { EnquiryFormComponent } from './enquiry-form/enquiry-form.component';

import { I18nModule } from '../i18n/i18n.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PersonalAssistantComponent,
    EnquiryFormComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConciergeServiceRoutingModule,
    I18nModule
  ]
})
export class ConciergeServiceModule { }
