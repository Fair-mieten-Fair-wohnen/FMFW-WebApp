import { BrowserModule } from '@angular/platform-browser';
import { NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { NgxMdModule } from 'ngx-md';
import { AppComponent } from './app.component';
import { ItemsModule } from './items/items.module';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AppRoutingModule } from './app-routing.module';
import { UtilsModule } from './utils/utils.module';
import { SpinnerComponent } from './services/spinner/spinner.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ToastrModule} from "ngx-toastr";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import localeDeExtra from '@angular/common/locales/extra/de';
import {KeycloakAngularModule} from "keycloak-angular";
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { SupportFormComponent } from './help/support-form/support-form.component';
import { AccessDeniedForRoleComponent } from './access-denied/access-denied-for-role/access-denied-for-role.component';
import { AccessDeniedWorkInProgressComponent } from './access-denied/access-denied-work-in-progress/access-denied-work-in-progress.component';
import { PrintviewModule } from './printview/printview.module';
import { AggregationModule } from './aggregation/aggregation.module';

registerLocaleData(localeDe, 'de-DE', localeDeExtra);

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SpinnerComponent,
    AccessDeniedComponent,
    SupportFormComponent,
    AccessDeniedForRoleComponent,
    AccessDeniedWorkInProgressComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule,
    HttpClientModule,
    ItemsModule,
    AggregationModule,
    NgxMdModule.forRoot(),
    PrintviewModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), BsDatepickerModule.forRoot(), TimepickerModule.forRoot(), ModalModule.forRoot(), PaginationModule.forRoot(), // Bootstrap modules added
    KeycloakAngularModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
