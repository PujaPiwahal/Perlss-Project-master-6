import { LsaFormComponent } from './../../referral-forms/lsa-form/lsa-form.component';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommitteeReviewFormComponent } from '../../referral-forms/committee-review-form/committee-review-form.component';
import { EmergentCircumstancesReviewFormComponent } from '../../referral-forms/emergent-circumstances-review-form/emergent-circumstances-review-form.component';
import { MutipleComplexFormComponent } from '../../referral-forms/mutiple-complex-form/mutiple-complex-form.component';
import { SustainCurrentFamilyLivArrangementsFormComponent } from '../../referral-forms/sustain-current-family-liv-arrangements-form/sustain-current-family-liv-arrangements-form.component';
import { PlannedTransitionPopupComponent } from '../../referral-forms/planned-transition-popup/planned-transition-popup.component';

@Component({
  selector: 'app-referral-intake-outcome',
  templateUrl: './referral-intake-outcome.component.html',
  styleUrls: ['./referral-intake-outcome.component.scss']
})
export class ReferralIntakeOutcomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }


  transitionPopup() {
    this.dialog.open(PlannedTransitionPopupComponent, {
      width: '60vw',
      height: '80vh'
    });
  }

  multipleComplexFormEfill() {
    this.dialog.open(MutipleComplexFormComponent, {
      width: 'auto',
      height: 'auto',
      autoFocus: false,
      maxHeight: '90vh'
    });
  }

  sustainCurrentFamLivArrangements() {
    this.dialog.open(SustainCurrentFamilyLivArrangementsFormComponent, {
      width: 'auto',
      height: 'auto',
      autoFocus: false,
      maxHeight: '90vh'
    });
  }

  emergentCircumstancesReviewForm() {
    this.dialog.open(EmergentCircumstancesReviewFormComponent, {
      width: 'auto',
      height: 'auto',
      autoFocus: false,
      maxHeight: '90vh'
    });
  }

  lsaFormEfill(){
    this.dialog.open(LsaFormComponent, {
      width: 'auto',
      height: 'auto',
      autoFocus: false,
      maxHeight: '90vh'
    });
}

  committeeReviewForm() {
    this.dialog.open(CommitteeReviewFormComponent, {
      width: 'auto',
      height: 'auto',
      autoFocus: false,
      maxHeight: '90vh'
    });
  }



}
