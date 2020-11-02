import { PaeDashboardComponent } from './pae-dashboard/pae-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from './../_shared/app-material.module';
import { PaeComponent } from './pae.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaeRoutingModule } from './pae-routing.module';
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
import { MedicalDiagnosisEcfApplicationComponent } from './pae-medical-diagnosis/medical-diagnosis-ecf-application/medical-diagnosis-ecf-application.component';
import { MedicalDiagnosisHcbsApplicationComponent } from './pae-medical-diagnosis/medical-diagnosis-hcbs-application/medical-diagnosis-hcbs-application.component';
import { MedicalDiagnosisKbApplicationComponent } from './pae-medical-diagnosis/medical-diagnosis-kb-application/medical-diagnosis-kb-application.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { MedicalDiagonsisComponent } from './pae-medical-diagnosis/medical-diagonsis/medical-diagonsis.component';
import { MedicalDiagnosisICFComponent } from './pae-medical-diagnosis/medical-diagnosis-icf-application/medical-diagnosis-icf-application.component';

@NgModule({
  declarations: [PaeComponent,
    PaeDashboardComponent,
    PaeApplicantInformationComponent,
    PaeContactInformationComponent,
    PaeLivingArrangementComponent,
    PaeSelectProgramComponent,
    PaeAppointmentComponent,
    PaeIntensiveInterventionsComponent,
    PaeActivitiesPartTwoComponent,
    PaeWelcomeComponent,
    PaeDiagnosisSummaryComponent,
    PaeCapabilitiesPartOneComponent,
    PaeCapabilitiesPartTwoComponent,
    PaeFunctionalAssessmentSummaryComponent,
    PaeActivityDailyLivingPartOneComponent,
    PaeSafetyDeterminationFallHistoryComponent,
    PaeNutritionFeedingComponent,
    MedicalDiagnosisEcfApplicationComponent,
    MedicalDiagnosisHcbsApplicationComponent,
    MedicalDiagnosisKbApplicationComponent,
    MedicalDiagonsisComponent,
    MedicalDiagnosisICFComponent
  ],
  imports: [
    NgSelectModule,
    CommonModule,
    PaeRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class PaeModule { }
