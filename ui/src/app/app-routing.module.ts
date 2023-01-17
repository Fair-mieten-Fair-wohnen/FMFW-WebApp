import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {AccessDeniedComponent} from "./access-denied/access-denied.component";
import {SupportFormComponent} from "./help/support-form/support-form.component";
import {AccessDeniedForRoleComponent} from "./access-denied/access-denied-for-role/access-denied-for-role.component";
import {AuthGuard} from "./auth/auth.guard";
import {AccessDeniedWorkInProgressComponent} from "./access-denied/access-denied-work-in-progress/access-denied-work-in-progress.component";

const appRoutes:  Routes = [
  { path: 'access-denied-for-role',
    component: AccessDeniedForRoleComponent,
    canActivate: [ AuthGuard ],
    data: {
      roles_forbidden: ["fmfw-user"]
    },
  },
  { path: 'access-denied-work-in-progress', component: AccessDeniedWorkInProgressComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'support-form', component: SupportFormComponent },
  { path: '',   redirectTo: '/items', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
