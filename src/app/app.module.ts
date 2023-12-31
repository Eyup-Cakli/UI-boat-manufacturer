import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ComponentsModule } from './core/modules/components.module';
import { AdminLayoutComponent } from './core/components/app/layouts/admin-layout/admin-layout.component';
import { TranslationService } from './core/services/Translation.service';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { HttpEntityRepositoryService } from './core/services/http-entity-repository.service';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { BoatHullMetarialComponent } from './core/components/admin/boat-hull-metarial/boat-hull-metarial.component';
import { BoatManufacturerComponent } from './core/components/admin/boat-manufacturer/boat-manufacturer.component';
import { BoatManufacturerLogoComponent } from './core/components/admin/boat-manufacturer-logo/boat-manufacturer-logo.component';
import { BoatModelComponent } from './core/components/admin/boat-model/boat-model.component';
import { BoatTypeComponent } from './core/components/admin/boat-type/boat-type.component';
import { MatPaginatorModule } from '@angular/material/paginator';

// i18 kullanıclak ise aşağıdaki metod aktif edilecek

//  export function HttpLoaderFactory(http: HttpClient) {
//    
//    var asd=new TranslateHttpLoader(http, '../../../../assets/i18n/', '.json'); 
//    return asd;
//  }


export function tokenGetter() {
  return localStorage.getItem("token");
}


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatSortModule,
    MatTableModule,
    MatAutocompleteModule,
    MatPaginatorModule,
    CommonModule,
    NgMultiSelectDropDownModule.forRoot(),
    SweetAlert2Module.forRoot(),
    NgbModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        //useFactory:HttpLoaderFactory, //i18 kullanılacak ise useClass kapatılıp yukarıda bulunan HttpLoaderFactory ve bu satır aktif edilecek
        useClass: TranslationService,
        deps: [HttpClient]
      }
    })
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    BoatHullMetarialComponent,
    BoatManufacturerComponent,
    BoatManufacturerLogoComponent,
    BoatModelComponent,
    BoatTypeComponent
  ],

  providers: [
    HttpEntityRepositoryService,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
