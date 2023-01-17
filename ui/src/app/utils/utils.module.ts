import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavTopLogoutComponent } from './nav-top-logout/nav-top-logout.component';
import { ItemsRoutingModule } from '../items/items-routing.module';
import {ModalComponent} from "./modal/modal.component";

@NgModule({
  imports: [
    CommonModule,
    ItemsRoutingModule
  ],
  declarations: [
    NavTopLogoutComponent,
    ModalComponent
  ],
  exports: [
    NavTopLogoutComponent,
    ModalComponent
  ]
})
export class UtilsModule { }
