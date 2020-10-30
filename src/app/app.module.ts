import { EnvService } from './_shared/utility/env.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule, APP_INITIALIZER} from '@angular/core';
import {AppMaterialModule} from './_shared/app-material.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HeaderComponent} from './core/header/header.component';
import {FooterComponent} from './core/footer/footer.component';
import {LoginComponent} from './login/login.component';
import {ErrorComponent} from './error/error.component';
import {ReactiveFormsModule} from '@angular/forms';
import {UserDetailsComponent} from './user-details/user-details.component';
import {AuditHistoryComponent} from './audit-history/audit-history.component';
import {AuditDetailsComponent} from './audit-details/audit-details.component';
import {ErrorInterceptor} from './core/helpers/error.interceptor';
import {JwtInterceptor} from './core/helpers/jwt.interceptor';
import {TokenStorage} from './_shared/utility/TokenStorage';
import { LeftnavComponent } from './leftnav/leftnav.component';
import { DiagnosisSummaryComponent } from './diagnosis-summary/diagnosis-summary.component';
import { InboxComponent } from './inbox/inbox.component';
import { DocumentsComponent } from './documents/documents.component';
import { NoticesComponent } from './notices/notices.component';
import { ChangeManagementComponent } from './change-management/change-management.component';
import { ReferralListManagementComponent } from './referral-list-management/referral-list-management.component';
import { WaitingListManagementComponent } from './waiting-list-management/waiting-list-management.component';
import { TransitionsComponent } from './transitions/transitions.component';
import { AdjudicationComponent } from './adjudication/adjudication.component';
import { EnrollmentDetailsComponent } from './enrollment/enrollment-details/enrollment-details.component';
import { EnrollmentSearchComponent } from './enrollment/enrollment-search/enrollment.search.component';
import { EnrollmentComponent } from './enrollment/enrollment.component';
import { AppealsComponent } from './appeals/appeals.component';
import { ReportsComponent } from './reports/reports.component';
import { SlotManagementComponent } from './slot-management/slot-management.component';
import { ManageUserProfilesComponent } from './manage-user-profiles/manage-user-profiles.component';
import { ManageUserRolesComponent } from './manage-user-roles/manage-user-roles.component';
import { MapBusinessFunctionsComponent } from './map-business-functions/map-business-functions.component';
import { MapTaskQueuesComponent } from './map-task-queues/map-task-queues.component';
import { WorkloadManagementComponent } from './workload-management/workload-management.component';
import { QualifiedAssessorsComponent } from './qualified-assessors/qualified-assessors.component';
import { PersonReconciliationComponent } from './person-reconciliation/person-reconciliation.component';
import { AdjudicationSearchComponent } from './adjudication/adjudication-search/adjudication-search.component';
import { AdjudicationDetailsComponent } from './adjudication/adjudication-details/adjudication-details.component';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { BnNgIdleService } from 'bn-ng-idle';
import { FaqComponent } from './core/widgets/faq/faq.component';
import { SavePopupComponent  } from './savePopup/savePopup.component';
import { SessionTimeoutPopupComponent } from './session-timeout-popup/session-timeout-popup.component';
import {DeleteRecordPopupComponent} from './_shared/modal/delete-record-popup/delete-record-popup.component';
import { WidgetsComponent } from './core/widgets/widgets.component';
import { ContactComponent } from './core/widgets/contact/contact.component';
import { FormComponent } from './core/widgets/form/form.component';
import { HcbsBenefitsComponent } from './core/widgets/hcbs-benefits/hcbs-benefits.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MedicalDiagonsis } from '../app/pae/Diagnosisdata';
//import { PaeActivityDailyLivingPartOneComponent } from './pae/pae-activity-daily-living-part-one/pae-activity-daily-living-part-one.component';

export const EnvServiceFactory = (envService: EnvService) => {
  return () => {
    return envService.loadConstants();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    ErrorComponent,
    UserDetailsComponent,
    AuditHistoryComponent,
    AuditDetailsComponent,
    LeftnavComponent,
    DiagnosisSummaryComponent,
    InboxComponent,
    DocumentsComponent,
    NoticesComponent,
    ChangeManagementComponent,
    ReferralListManagementComponent,
    WaitingListManagementComponent,
    TransitionsComponent,
    AdjudicationComponent,
    EnrollmentComponent,
    EnrollmentSearchComponent,
    EnrollmentDetailsComponent,
    AppealsComponent,
    ReportsComponent,
    SlotManagementComponent,
    ManageUserProfilesComponent,
    ManageUserRolesComponent,
    MapBusinessFunctionsComponent,
    MapTaskQueuesComponent,
    WorkloadManagementComponent,
    QualifiedAssessorsComponent,
    PersonReconciliationComponent,
    AdjudicationSearchComponent,
    AdjudicationDetailsComponent,
    FaqComponent,
    SavePopupComponent,
    SessionTimeoutPopupComponent,
    DeleteRecordPopupComponent,
    WidgetsComponent,
    ContactComponent,
    FormComponent,
    HcbsBenefitsComponent,
    //PaeActivityDailyLivingPartOneComponent
  ],
  exports:[],
  imports: [
    NgSelectModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AppMaterialModule,
    HttpClientModule,
    NgIdleKeepaliveModule.forRoot()

  ],
  providers: [TokenStorage, BnNgIdleService,
    MedicalDiagonsis,
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: APP_INITIALIZER,
      useFactory: EnvServiceFactory,
      deps: [EnvService],
      multi: true} ],
  entryComponents: [SessionTimeoutPopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule {
}
