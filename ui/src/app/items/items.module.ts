import {APP_INITIALIZER, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxMdModule } from 'ngx-md';
import { UtilsModule } from '../utils/utils.module';

import { ItemsRoutingModule } from './items-routing.module';
import { ItemListComponent } from './item-list/item-list.component';
import { ItemDetailComponent } from './item-detail-area/item-detail/item-detail.component';
import { ItemsAreaComponent } from './items-area/items-area.component';
import { VorgangstypComponent } from './item-detail-area/tabs-fmfw/vorgangstyp/vorgangstyp.component';
import { ItemDetailAreaComponent } from './item-detail-area/item-detail-area.component';
import { AllgemeinComponent } from './item-detail-area/tabs-fmfw/allgemein/allgemein.component';
import { PersonComponent } from './item-detail-area/tabs-fmfw/person/person.component';
import { UnterstuetzungComponent } from './item-detail-area/tabs-fmfw/unterstuetzung/unterstuetzung.component';
import { VerursachendenComponent } from './item-detail-area/tabs-fmfw/verursachenden/verursachenden.component';
import { KurzbeschreibungComponent } from './item-detail-area/tabs-fmfw/kurzbeschreibung/kurzbeschreibung.component';
import { ZeuginnenComponent } from './item-detail-area/tabs-fmfw/zeuginnen/zeuginnen.component';
import { TypologieComponent } from './item-detail-area/tabs-fmfw/typologie/typologie.component';
import { Verlauf1Component } from './item-detail-area/tabs-fmfw/verlauf1/verlauf1.component';
import { Verlauf2Component } from './item-detail-area/tabs-fmfw/verlauf2/verlauf2.component';
import { ZusammenfassungComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/zusammenfassung.component';
import { ItemNewComponent } from './item-detail-area/item-new/item-new.component';
import { ItemLoadingComponent } from './item-detail-area/item-loading/item-loading.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ItemFooterComponent } from './item-detail-area/item-footer/item-footer.component';
import { PrevNextButtonGroupComponent } from './item-detail-area/item-footer/prev-next-button-group/prev-next-button-group.component';
import { VorgangstypListComponent } from './item-detail-area/tabs-fmfw/vorgangstyp/vorgangstyp-list/vorgangstyp-list.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { deLocale } from 'ngx-bootstrap/locale';

import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import {CollapseModule} from "ngx-bootstrap/collapse";
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TreeModule } from 'angular-tree-component';
import {initializer} from "../utils/app-init";
import {KeycloakService} from "keycloak-angular";
import { SummaryComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/summary/summary.component';
import { ItemReadonlyComponent } from './item-detail-area/item-readonly/item-readonly.component';
import { FMFWItemSearchComponent } from '../components/item-search/fmfw-item-search.component';
import {ComponentsModule} from "../components/components.module";
import { SummaryMetadataComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/summary/tabs-fmfw/summary-metadata/summary-metadata.component';
import { SummaryVorganstypComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/summary/tabs-fmfw/summary-vorganstyp/summary-vorganstyp.component';
import { SummaryGeneraldataComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/summary/tabs-fmfw/summary-generaldata/summary-generaldata.component';
import { SummaryResultComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/summary/tabs-fmfw/summary-result/summary-result.component';
import { SummaryEffectedPersonComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/summary/tabs-fmfw/summary-effected-person/summary-effected-person.component';
import { SummaryFalltypologieComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/summary/tabs-fmfw/summary-falltypologie/summary-falltypologie.component';
import { SummaryInterventionsComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/summary/tabs-fmfw/summary-interventions/summary-interventions.component';
import { ResultComponent } from './item-detail-area/tabs-fmfw/result/result.component';
import { CauserTopologyComponent } from './item-detail-area/tabs-fmfw/verursachenden/causer-topology/causer-topology.component';
import { CauserTypeTextviewComponent } from './item-detail-area/tabs-fmfw/verursachenden/causer-type-textview/causer-type-textview.component';
import { SummaryCauserComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/summary/tabs-fmfw/summary-causer/summary-causer.component';
import { BeweiseComponent } from './item-detail-area/tabs-fmfw/beweise/beweise.component';
import { SummaryInvolvedComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/summary/tabs-fmfw/summary-involved/summary-involved.component';
import { SummaryEvidenceComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/summary/tabs-fmfw/summary-evidence/summary-evidence.component';
import { SummarySupporterComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/summary/tabs-fmfw/summary-supporter/summary-supporter.component';
import { SummaryShortIncidentDescriptionComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/summary/tabs-fmfw/summary-short-incident-description/summary-short-incident-description.component';
import { SummaryConclusionComponent } from './item-detail-area/tabs-fmfw/zusammenfassung/summary/tabs-fmfw/summary-conclusion/summary-conclusion.component';

defineLocale('de', deLocale);

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UtilsModule,
    NgxMdModule.forRoot(),
    // Bootstrap modules
    BsDatepickerModule.forRoot(), TimepickerModule.forRoot(), CollapseModule.forRoot(), ModalModule.forRoot(), PaginationModule.forRoot(),
    TreeModule.forRoot(),
    ItemsRoutingModule,
    ComponentsModule
  ],
  declarations: [
    ItemListComponent,
    ItemDetailComponent,
    ItemsAreaComponent,
    VorgangstypComponent,
    ItemDetailAreaComponent,
    AllgemeinComponent,
    PersonComponent,
    UnterstuetzungComponent,
    VerursachendenComponent,
    KurzbeschreibungComponent,
    ZeuginnenComponent,
    TypologieComponent,
    Verlauf1Component,
    Verlauf2Component,
    ZusammenfassungComponent,
    ItemNewComponent,
    ItemLoadingComponent,
    ItemFooterComponent,
    PrevNextButtonGroupComponent,
    VorgangstypListComponent,
    SummaryComponent,
    ItemReadonlyComponent,
    FMFWItemSearchComponent,
    SummaryMetadataComponent,
    SummaryVorganstypComponent,
    SummaryGeneraldataComponent,
    SummaryResultComponent,
    SummaryEffectedPersonComponent,
    SummaryFalltypologieComponent,
    SummaryInterventionsComponent,
    ResultComponent,
    CauserTopologyComponent,
    CauserTypeTextviewComponent,
    SummaryCauserComponent,
    BeweiseComponent,
    SummaryInvolvedComponent,
    SummaryEvidenceComponent,
    SummarySupporterComponent,
    SummaryShortIncidentDescriptionComponent,
    SummaryConclusionComponent
  ],
  exports: [
    SummaryComponent
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: initializer,
      multi: true,
      deps: [KeycloakService]
    }
  ]
})
export class ItemsModule { }
