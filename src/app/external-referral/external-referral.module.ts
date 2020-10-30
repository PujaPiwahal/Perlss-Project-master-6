import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AppMaterialModule} from '../_shared/app-material.module';
import {ReactiveFormsModule} from '@angular/forms';
import { ExternalReferralRoutingModule } from './external-referral-routing.module';
import { ExternalReferralComponent } from './external-referral.component';
import { ExtrefApplicantInformationComponent } from './extref-applicant-information/extref-applicant-information.component';
import { ExtrefCareSupportComponent } from './extref-care-support/extref-care-support.component';
import { ExtrefContactInformationComponent } from './extref-contact-information/extref-contact-information.component';
import { ExtrefSchoolWorkComponent } from './extref-school-work/extref-school-work.component';
import { ExtrefStartComponent } from './extref-start/extref-start.component';
import { ExtrefSubmitComponent } from './extref-submit/extref-submit.component';




@NgModule({
  declarations: [
    ExternalReferralComponent,
    ExtrefApplicantInformationComponent,
    ExtrefCareSupportComponent,
    ExtrefContactInformationComponent,
    ExtrefSchoolWorkComponent,
    ExtrefStartComponent,
    ExtrefSubmitComponent
  ],
  imports: [
    CommonModule,
    ExternalReferralRoutingModule,
    AppMaterialModule,
    ReactiveFormsModule
  ]
})
export class ExternalReferralModule { }
