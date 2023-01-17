import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ItemListComponent} from './item-list/item-list.component';
import {ItemDetailComponent} from './item-detail-area/item-detail/item-detail.component';
import {ItemsAreaComponent} from './items-area/items-area.component';
import {AuthGuard} from '../auth/auth.guard';
import { VorgangstypComponent } from './item-detail-area/tabs-fmfw/vorgangstyp/vorgangstyp.component';
import {ItemDetailAreaComponent} from './item-detail-area/item-detail-area.component';
import {AllgemeinComponent} from './item-detail-area/tabs-fmfw/allgemein/allgemein.component';
import {PersonComponent} from './item-detail-area/tabs-fmfw/person/person.component';
import {UnterstuetzungComponent} from './item-detail-area/tabs-fmfw/unterstuetzung/unterstuetzung.component';
import {VerursachendenComponent} from './item-detail-area/tabs-fmfw/verursachenden/verursachenden.component';
import {KurzbeschreibungComponent} from './item-detail-area/tabs-fmfw/kurzbeschreibung/kurzbeschreibung.component';
import {ZeuginnenComponent} from './item-detail-area/tabs-fmfw/zeuginnen/zeuginnen.component';
import {TypologieComponent} from './item-detail-area/tabs-fmfw/typologie/typologie.component';
import {Verlauf1Component} from './item-detail-area/tabs-fmfw/verlauf1/verlauf1.component';
import {Verlauf2Component} from './item-detail-area/tabs-fmfw/verlauf2/verlauf2.component';
import {ZusammenfassungComponent} from './item-detail-area/tabs-fmfw/zusammenfassung/zusammenfassung.component';
import {ItemNewComponent} from './item-detail-area/item-new/item-new.component';
import {ItemLoadingComponent} from './item-detail-area/item-loading/item-loading.component';
import {ItemReadonlyComponent} from "./item-detail-area/item-readonly/item-readonly.component";
import {CanDeactivateGuard} from "../auth/can-deactivate.guard";
import {ResultComponent} from "./item-detail-area/tabs-fmfw/result/result.component";
import {BeweiseComponent} from "./item-detail-area/tabs-fmfw/beweise/beweise.component";

export const itemsRoutesFMFW: Routes = [
  {
    path: 'items',
    component: ItemListComponent,
    canActivate: [ AuthGuard ],
    data: {
      roles_required: ["fmfw-user"]
    },
  },
  {
    path: 'items-area',
    canActivate: [ AuthGuard ],
    data: {
      roles_required: ["fmfw-user"]
    },
    component: ItemsAreaComponent,
    children: [
      {
        path: 'item',
        component: ItemDetailAreaComponent,
        children: [
          {
            path: 'neu',
            component: ItemNewComponent,
            data: {
              active_area: 'INCIDENTS',
              active_tabs: 'NEU'
            },
            children: [
              { path: '',
                component: VorgangstypComponent
              }
            ]
          },
          {
            path: ':id',
            component: ItemLoadingComponent,
            children: [
              {
                path: 'READONLY',
                component: ItemReadonlyComponent,
                children: [
                  {
                    path: 'ALLG_BERATUNG',
                    data: {
                      active_area: 'INCIDENTS',
                      active_tabs: 'READONLY_ALLG_BERATUNG'
                    },
                    component: ItemDetailComponent,
                    children: [
                      {
                        path: 'zusammenfassung',
                        component: ZusammenfassungComponent
                      },
                      {
                        path: '',
                        redirectTo: 'zusammenfassung',
                        pathMatch: 'full'
                      }
                    ]
                  },
                  {
                    path: 'MELDUNG',
                    data: {
                      active_area: 'INCIDENTS',
                      active_tabs: 'READONLY_MELDUNG'
                    },
                    component: ItemDetailComponent,
                    children: [
                      {
                        path: 'zusammenfassung',
                        component: ZusammenfassungComponent
                      },
                      {
                        path: '',
                        redirectTo: 'zusammenfassung',
                        pathMatch: 'full'
                      }
                    ]
                  },
                  {
                    path: 'FALLBETREUUNG',
                    data: {
                      active_area: 'INCIDENTS',
                      active_tabs: 'READONLY_FALLBETREUUNG'
                    },
                    component: ItemDetailComponent,
                    children: [
                      {
                        path: 'zusammenfassung',
                        component: ZusammenfassungComponent
                      },
                      {
                        path: '',
                        redirectTo: 'zusammenfassung',
                        pathMatch: 'full'
                      }
                    ]
                  }
                ]
              },
              {
                path: 'ALLG_BERATUNG',
                data: {
                  active_area: 'INCIDENTS',
                  active_tabs: 'ALLG_BERATUNG'
                },
                component: ItemDetailComponent,
                canDeactivate: [CanDeactivateGuard],
                children: [
                  {
                    path: 'vorgangstyp',
                    component: VorgangstypComponent
                  },
                  {
                    path: 'allgemein',
                    component: AllgemeinComponent,
                    canDeactivate: [CanDeactivateGuard],
                  },
                  {
                    path: 'typologie',
                    component: TypologieComponent
                  },
                  {
                    path: 'zusammenfassung',
                    component: ZusammenfassungComponent
                  },
                  {
                    path: '',
                    redirectTo: 'allgemein',
                    pathMatch: 'full'
                  }
                ]
              },
              {
                path: 'MELDUNG',
                data: {
                  active_area: 'INCIDENTS',
                  active_tabs: 'MELDUNG'
                },
                component: ItemDetailComponent,
                canDeactivate: [CanDeactivateGuard],
                children: [
                  {
                    path: 'vorgangstyp',
                    component: VorgangstypComponent
                  },
                  {
                    path: 'allgemein',
                    component: AllgemeinComponent,
                    canDeactivate: [CanDeactivateGuard],
                  },
                  {
                    path: 'person',
                    component: PersonComponent
                  },
                  {
                    path: 'unterstuetzung',
                    component: UnterstuetzungComponent
                  },
                  {
                    path: 'verursachenden',
                    component: VerursachendenComponent
                  },
                  {
                    path: 'kurzbeschreibung',
                    component: KurzbeschreibungComponent
                  },
                  {
                    path: 'zeuginnen',
                    component: ZeuginnenComponent
                  },
                  {
                    path: 'beweise',
                    component: BeweiseComponent
                  },
                  {
                    path: 'typologie',
                    component: TypologieComponent
                  },
                  {
                    path: 'zusammenfassung',
                    component: ZusammenfassungComponent
                  },
                  {
                    path: '',
                    redirectTo: 'allgemein',
                    pathMatch: 'full'
                  }
                ]
              },
              {
                path: 'FALLBETREUUNG',
                data: {
                  active_area: 'INCIDENTS',
                  active_tabs: 'FALLBETREUUNG'
                },
                component: ItemDetailComponent,
                canDeactivate: [CanDeactivateGuard],
                children: [
                  {
                    path: 'vorgangstyp',
                    component: VorgangstypComponent
                  },
                  {
                    path: 'allgemein',
                    component: AllgemeinComponent,
                    canDeactivate: [CanDeactivateGuard],
                  },
                  {
                    path: 'person',
                    component: PersonComponent
                  },
                  {
                    path: 'unterstuetzung',
                    component: UnterstuetzungComponent
                  },
                  {
                    path: 'verursachenden',
                    component: VerursachendenComponent
                  },
                  {
                    path: 'kurzbeschreibung',
                    component: KurzbeschreibungComponent
                  },
                  {
                    path: 'zeuginnen',
                    component: ZeuginnenComponent
                  },
                  {
                    path: 'beweise',
                    component: BeweiseComponent
                  },
                  {
                    path: 'typologie',
                    component: TypologieComponent
                  },
                  {
                    path: 'verlauf1',
                    component: Verlauf1Component
                  },
                  {
                    path: 'verlauf2',
                    component: Verlauf2Component
                  },
                  {
                    path: 'result',
                    component: ResultComponent
                  },
                  {
                    path: 'zusammenfassung',
                    component: ZusammenfassungComponent
                  },
                  {
                    path: '',
                    redirectTo: 'allgemein',
                    pathMatch: 'full'
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(itemsRoutesFMFW)],
  exports: [RouterModule],
  providers: [AuthGuard]

})
export class ItemsRoutingModule { }
