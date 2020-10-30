
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ReferralService } from '../../core/services/referral/referral.service';
import { Router } from '@angular/router';
import * as customValidation from '../../_shared/constants/validation.constants';
import { CustomvalidationService } from '../../_shared/utility/customvalidation.service';
import { throwMatDialogContentAlreadyAttachedError } from '@angular/material/dialog';

@Component({
  selector: 'pae-functional-assessment-summary',
  templateUrl: './pae-functional-assessment-summary.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./pae-functional-assessment-summary.component.scss'],
})
export class PaeFunctionalAssessmentSummaryComponent implements OnInit {
  customValidation = customValidation;

  event: string;
  submitted: boolean;
  choice: "KB";
  functionalAssessmentSummaryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private refService: ReferralService,
    private router: Router,
    private customValidator: CustomvalidationService
  ) {}



  getFormData() {
    //return this.RefActivitiesPartTwoForm.controls;
  }

  ngOnInit(): void {

    this.functionalAssessmentSummaryForm = this.fb.group({
      pageChoice: new FormControl()
    });
  }

  onChoice(mrChange: MatRadioChange) {
    this.choice = mrChange.value;
  }

  saveAndExit() {
    this.event = 'SaveAndExit';
    this.saveActivitiesPartTwo();
  }
 
  next() {
    var routes = { KB: 'activitiesPartTwo', Standard:  'capabilitiesNeedsPartTwo'};
    this.event = 'Next';
    this.submitted = true;
    window.localStorage.setItem("partTwo","/dashboard/pae/" + routes[this.choice]);
    this.router.navigate(['/dashboard/pae/capabilitiesNeedsPartOne']);
  }
  
  saveActivitiesPartTwo() {
    this.next();
  }

  back() {
    const previousForm = 'PRAPIF';
  }
}
