import { Routes } from '@angular/router';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { BoatHullMetarialComponent } from 'app/core/components/admin/boat-hull-metarial/boat-hull-metarial.component';
import { BoatManufacturerComponent } from 'app/core/components/admin/boat-manufacturer/boat-manufacturer.component';
import { BoatManufacturerLogoComponent } from 'app/core/components/admin/boat-manufacturer-logo/boat-manufacturer-logo.component';
import { BoatModelComponent } from 'app/core/components/admin/boat-model/boat-model.component';
import { BoatTypeComponent } from 'app/core/components/admin/boat-type/boat-type.component';




export const AdminLayoutRoutes: Routes = [
    
    { path: 'dashboard',      component: DashboardComponent},
    { path: 'material',      component: BoatHullMetarialComponent }, 
    { path: 'manufacturer',      component: BoatManufacturerComponent },
    { path: 'logo',      component: BoatManufacturerLogoComponent },
    { path: 'model',      component: BoatModelComponent },
    { path: 'type',      component: BoatTypeComponent }
];
