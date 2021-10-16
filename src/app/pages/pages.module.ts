import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { MediaCsrComponent } from './media-csr/media-csr.component';
import { CartComponent } from './cart/cart.component';
import { I18nModule } from '../i18n/i18n.module';
import { ProfileComponent } from './profile/profile.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AboutUsComponent,
    ContactUsComponent,
    MediaCsrComponent,
    CartComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ReactiveFormsModule,
    I18nModule
  ]
})
export class PagesModule { }
