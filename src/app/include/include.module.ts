import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IncludeRoutingModule } from './include-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

import { I18nModule } from '../i18n/i18n.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    IncludeRoutingModule,
    ReactiveFormsModule,
    I18nModule
  ]
})
export class IncludeModule { }
