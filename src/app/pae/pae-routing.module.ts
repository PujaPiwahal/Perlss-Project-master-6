import { PaeDashboardComponent } from './pae-dashboard/pae-dashboard.component';
import { PaeComponent } from './pae.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/helpers/auth.guard';
import { PaeActivitiesPartTwoComponent } from './pae-activities-part-two/pae-activities-part-two.component';
import { PaeActivityDailyLivingPartOneComponent } from './pae-activity-daily-living-part-one/pae-activity-daily-living-part-one.component';
import { PaeApplicantInformationComponent } from './pae-applicant-information/pae-applicant-information.component';
import { PaeAppointmentComponent } from './pae-appointment/pae-appointment.component';
import { PaeCapabilitiesPartOneComponent } from './pae-capabilities-part-one/pae-capabilities-part-one.component';
import { PaeCapabilitiesPartTwoComponent } from './pae-capabilities-part-two/pae-capabilities-part-two.component';
import { PaeContactInformationComponent } from './pae-contact-information/pae-contact-information.component';
import { PaeDiagnosisSummaryComponent } from './pae-diagnosis-summary/pae-diagnosis-summary.component';
import { PaeFunctionalAssessmentSummaryComponent } from './pae-functional-assessment-summary/pae-functional-assessment-summary.component';
import { PaeIntensiveInterventionsComponent } from './pae-intensive-interventions/pae-intensive-interventions.component';
import { PaeLivingArrangementComponent } from './pae-living-arrangement/pae-living-arrangement.component';
import { PaeNutritionFeedingComponent } from './pae-nutrition-feeding/pae-nutrition-feeding.component';
import { PaeSafetyDeterminationFallHistoryComponent } from './pae-safety-determination-fall-history/pae-safety-determination-fall-history.component';
import { PaeSelectProgramComponent } from './pae-select-program/pae-select-program.component';
import { PaeWelcomeComponent } from './pae-welcome/pae-welcome.component';
import { MedicalDiagonsisComponent } from './medical-diagonsis/medical-diagonsis.component';

const routes: Routes = [{ path: '', component: PaeComponent, children: [
  {path: '', pathMatch: 'full', redirectTo: 'paeDashboard'},
  {path: 'paeDashboard', component: PaeDashboardComponent, canActivate: [AuthGuard]},
  {path: 'applicantInformation', component: PaeApplicantInformationComponent, canActivate: [AuthGuard]},
  {path: 'contactInformation', component: PaeContactInformationComponent, canActivate: [AuthGuard]},
  {path: 'livingArrangement', component: PaeLivingArrangementComponent, canActivate: [AuthGuard]},
  {path: 'selectProgram', component: PaeSelectProgramComponent, canActivate: [AuthGuard]},
  {path: 'appointment', component: PaeAppointmentComponent, canActivate: [AuthGuard]},
  {path: 'diagnosisSummary', component: PaeDiagnosisSummaryComponent, canActivate: [AuthGuard]},
  {path: 'capabilitiesNeedsPartOne', component: PaeCapabilitiesPartOneComponent, canActivate: [AuthGuard]},
  {path: 'capabilitiesNeedsPartTwo', component: PaeCapabilitiesPartTwoComponent, canActivate: [AuthGuard]},
  {path: 'activitiesPartTwo', component:PaeActivitiesPartTwoComponent, canActivate:[AuthGuard]},
  {path: 'welcome', component:PaeWelcomeComponent, canActivate:[AuthGuard]},
  {path: 'functionalAssessment', component:PaeFunctionalAssessmentSummaryComponent, canActivate:[AuthGuard]},
  {path: 'fallHistory', component:PaeSafetyDeterminationFallHistoryComponent, canActivate:[AuthGuard]},
  {path: 'nutritionFeeding', component:PaeNutritionFeedingComponent, canActivate:[AuthGuard]},
  {path: 'activitiesDailyLivingPartOne', component:PaeActivityDailyLivingPartOneComponent, canActivate:[AuthGuard]},
  {path: 'intensiveInterventions', component:PaeIntensiveInterventionsComponent, canActivate:[AuthGuard]},
  {path: 'medicalDiagnosis', component: MedicalDiagonsisComponent, canActivate: [AuthGuard]}
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaeRoutingModule { }
