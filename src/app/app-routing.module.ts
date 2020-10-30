import { PersonReconciliationComponent } from './person-reconciliation/person-reconciliation.component';
import { QualifiedAssessorsComponent } from './qualified-assessors/qualified-assessors.component';
import { WorkloadManagementComponent } from './workload-management/workload-management.component';
import { MapTaskQueuesComponent } from './map-task-queues/map-task-queues.component';
import { MapBusinessFunctionsComponent } from './map-business-functions/map-business-functions.component';
import { ManageUserRolesComponent } from './manage-user-roles/manage-user-roles.component';
import { ManageUserProfilesComponent } from './manage-user-profiles/manage-user-profiles.component';
import { SlotManagementComponent } from './slot-management/slot-management.component';
import { ReportsComponent } from './reports/reports.component';
import { AppealsComponent } from './appeals/appeals.component';
import { WaitingListManagementComponent } from './waiting-list-management/waiting-list-management.component';
import { ReferralListManagementComponent } from './referral-list-management/referral-list-management.component';
import { ChangeManagementComponent } from './change-management/change-management.component';
import { TransitionsComponent } from './transitions/transitions.component';
import { NoticesComponent } from './notices/notices.component';
import { DocumentsComponent } from './documents/documents.component';
import { InboxComponent } from './inbox/inbox.component';
import { LeftnavComponent } from './leftnav/leftnav.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ErrorComponent } from './error/error.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { AuditHistoryComponent } from './audit-history/audit-history.component';
import { AuditDetailsComponent } from './audit-details/audit-details.component';
import { AuthGuard } from './core/helpers/auth.guard';
import { AdjudicationSearchComponent } from './adjudication/adjudication-search/adjudication-search.component';
import { AdjudicationDetailsComponent } from './adjudication/adjudication-details/adjudication-details.component';
import {EnrollmentSearchComponent} from './enrollment/enrollment-search/enrollment.search.component';
import {EnrollmentDetailsComponent} from './enrollment/enrollment-details/enrollment-details.component';
import {MaintenanceScreenComponent} from './maintenance-screen/maintenance-screen.component';


const routes: Routes = [
  { path: '',  redirectTo: '/login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'error', component: ErrorComponent },
  {path: 'maintanence', component: MaintenanceScreenComponent},
  {path: 'externalreferral',
  loadChildren: () => import('./external-referral/external-referral.module').then(m => m.ExternalReferralModule)},
  { path: 'dashboard', component: LeftnavComponent, canActivate: [AuthGuard], children: [
      {path: 'userDetails', component: UserDetailsComponent, canActivate: [AuthGuard]},
      {path: 'inbox', component: InboxComponent, canActivate: [AuthGuard]},
      { path: 'referral',
      loadChildren: () => import('./referral/referral.module').then(m => m.ReferralModule), canActivate: [AuthGuard] },
      {path: 'appointments',
      loadChildren: () => import('./appointments/appointments.module').then(m => m.AppointmentsModule), canActivate: [AuthGuard] },
      {path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard]},
      {path: 'notices', component: NoticesComponent, canActivate: [AuthGuard]},
      {path: 'transitions', component: TransitionsComponent, canActivate: [AuthGuard]},
      {path: 'changeManagement', component: ChangeManagementComponent, canActivate: [AuthGuard]},
      {path: 'referralListManagement', component: ReferralListManagementComponent, canActivate: [AuthGuard]},
      {path: 'waitingListManagement', component: WaitingListManagementComponent, canActivate: [AuthGuard]},
      {path: 'auditHistory', component: AuditHistoryComponent , canActivate: [AuthGuard]},
      {path: 'auditDetails', component: AuditDetailsComponent, canActivate: [AuthGuard]},
      {path: 'adjudicationSearch', component: AdjudicationSearchComponent, canActivate: [AuthGuard]},
      {path: 'adjudicationDetail', component: AdjudicationDetailsComponent, canActivate: [AuthGuard]},
      {path: 'enrollmentSearch', component: EnrollmentSearchComponent, canActivate: [AuthGuard]},
      {path: 'enrollmentDetail', component: EnrollmentDetailsComponent, canActivate: [AuthGuard]},
      {path: 'appeals', component: AppealsComponent , canActivate: [AuthGuard]},
      {path: 'reports', component: ReportsComponent , canActivate: [AuthGuard]},
      {path: 'slotManagement', component: SlotManagementComponent , canActivate: [AuthGuard]},
      {path: 'manageUserProfiles', component: ManageUserProfilesComponent , canActivate: [AuthGuard]},
      {path: 'manageUserRoles', component: ManageUserRolesComponent , canActivate: [AuthGuard]},
      {path: 'mapBusinessFunctions', component: MapBusinessFunctionsComponent , canActivate: [AuthGuard]},
      {path: 'mapTaskQueues', component: MapTaskQueuesComponent , canActivate: [AuthGuard]},
      {path: 'workLoadManagement', component: WorkloadManagementComponent , canActivate: [AuthGuard]},
      {path: 'qualifiedAssessors', component: QualifiedAssessorsComponent , canActivate: [AuthGuard]},
      {path: 'personReconciliation', component: PersonReconciliationComponent , canActivate: [AuthGuard]}
  ]},
  {path: 'dashboard/pae',
      loadChildren: () => import('./pae/pae.module').then(m => m.PaeModule), canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
