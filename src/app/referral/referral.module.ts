import { RefConfirmationComponent } from './ref-confirmation/ref-confirmation.component';
import { ReferralSubmitComponent } from './referral-submit/referral-submit.component';
import { RefCareAndSupportComponent } from './ref-care-and-support/ref-care-and-support.component';
import { ReferralSchoolWorkComponent } from './referral-school-work/referral-school-work.component';
import { ReferralStartComponent } from './referral-start/referral-start.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReferralRoutingModule } from './referral-routing.module';
import { ReferralComponent } from './referral.component';
import { ReferralStepperComponent } from './referral-stepper-start/referral-stepper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AppMaterialModule } from '../_shared/app-material.module';
import { RefApplicantComponent } from './ref-applicant/ref-applicant.component';
import { RefContactComponent } from './ref-contact/ref-contact.component';
import { ReferralDashboardComponent } from './referral-dashboard/referral-dashboard.component';
import { CommitteeReviewFormComponent } from './referral-dashboard/referral-forms/committee-review-form/committee-review-form.component';
import { EmergentCircumstancesReviewFormComponent } from './referral-dashboard/referral-forms/emergent-circumstances-review-form/emergent-circumstances-review-form.component';
import { LsaFormComponent } from './referral-dashboard/referral-forms/lsa-form/lsa-form.component';
import { MutipleComplexFormComponent } from './referral-dashboard/referral-forms/mutiple-complex-form/mutiple-complex-form.component';
import { PlannedTransitionPopupComponent } from './referral-dashboard/referral-forms/planned-transition-popup/planned-transition-popup.component';
import { SustainCurrentFamilyLivArrangementsFormComponent } from './referral-dashboard/referral-forms/sustain-current-family-liv-arrangements-form/sustain-current-family-liv-arrangements-form.component';
import { ReferralIntakeActionsComponent } from './referral-dashboard/referral-intake-actions/referral-intake-actions.component';
import { ReferralIntakeOutcomeComponent } from './referral-dashboard/referral-intake-actions/referral-intake-outcome/referral-intake-outcome.component';


@NgModule({
  declarations: [ReferralComponent,
    ReferralStepperComponent,
    ReferralStartComponent,
    RefApplicantComponent,
    RefContactComponent,
    ReferralSchoolWorkComponent,
    RefCareAndSupportComponent,
    ReferralSubmitComponent,
    RefConfirmationComponent,
    PlannedTransitionPopupComponent,
    ReferralDashboardComponent,
    ReferralIntakeActionsComponent,
    ReferralIntakeOutcomeComponent,
    MutipleComplexFormComponent,
    EmergentCircumstancesReviewFormComponent,
    CommitteeReviewFormComponent,
    SustainCurrentFamilyLivArrangementsFormComponent,
    LsaFormComponent

  ],
  imports: [
    CommonModule,
    ReferralRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class ReferralModule { }
