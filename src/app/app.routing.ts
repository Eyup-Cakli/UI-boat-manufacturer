import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { AdminLayoutComponent } from './core/components/app/layouts/admin-layout/admin-layout.component';
import { BoatHullMetarialComponent } from './core/components/admin/boat-hull-metarial/boat-hull-metarial.component';
import { BoatManufacturerComponent } from './core/components/admin/boat-manufacturer/boat-manufacturer.component';
import { BoatManufacturerLogoComponent } from './core/components/admin/boat-manufacturer-logo/boat-manufacturer-logo.component';
import { BoatModelComponent } from './core/components/admin/boat-model/boat-model.component';
import { BoatTypeComponent } from './core/components/admin/boat-type/boat-type.component';
// import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
// import { LoginComponent } from './login/login.component';

const routes: Routes =[
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  }, 


  {
    path: '',
    component: AdminLayoutComponent,
    children: [{
      path: 'admin-layout',
      // loadChildren: './core/components/app/layouts/admin-layout/admin-layout.module#AdminLayoutModule'
      loadChildren: () => import('./core/modules/admin-layout.module').then(m => m.AdminLayoutModule)
    },{
      path: 'material',
      component: BoatHullMetarialComponent
    },{
      path: 'manufacturer',
      component: BoatManufacturerComponent
    },{
      path: 'logo',
      component: BoatManufacturerLogoComponent
    },{
      path: 'model',
      component: BoatModelComponent
    },{
      path: 'type',
      component: BoatTypeComponent
    }]
  }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
       useHash: true
    })
  ],
  exports: [
    [RouterModule]
  ],
})
export class AppRoutingModule { }
