import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './home/login/login.component';

const routes: Routes = [
  { path: '', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule) },
  { path: 'pages', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)},
  { path: 'doctor', loadChildren: () => import('./doctors/doctors.module').then(m => m.DoctorsModule)},
  { path: 'concierge-service', loadChildren: () => import('./concierge-service/concierge-service.module').then(m => m.ConciergeServiceModule)},
  { path: 'medical-treatment', loadChildren: () => import('./medical-treatment/medical-treatment.module').then(m => m.MedicalTreatmentModule)},
  { path: 'wellness-retreat', loadChildren: () => import('./wellness-retreat/wellness-retreat.module').then(m => m.WellnessRetreatModule)},
  { path: 'rehabilitation-center', loadChildren: () => import('./rehabilitation-center/rehabilitation-center.module').then(m => m.RehabilitationCenterModule)},
  { path: 'elderly-care', loadChildren: () => import('./elderly-care/elderly-care.module').then(m => m.ElderlyCareModule)},
  { path: 'register-partner', loadChildren: () => import('./register-partner/register-partner.module').then(m => m.RegisterPartnerModule)},
  { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule)},

  { path: 'login', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
