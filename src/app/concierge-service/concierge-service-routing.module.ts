import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PersonalAssistantComponent } from './personal-assistant/personal-assistant.component';
import { EnquiryFormComponent } from './enquiry-form/enquiry-form.component';

const routes: Routes = [
  { path: '', component: PersonalAssistantComponent },
  { path: 'personal-assistant', component: PersonalAssistantComponent },
  { path: 'enquiry-form', component: EnquiryFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConciergeServiceRoutingModule { }
