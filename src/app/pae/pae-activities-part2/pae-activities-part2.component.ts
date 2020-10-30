
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferralService } from '../../core/services/referral/referral.service';
import { Router } from '@angular/router';
import * as customValidation from '../../_shared/constants/validation.constants';
import { CustomvalidationService } from '../../_shared/utility/customvalidation.service';

@Component({
  selector: 'pae-app-activites-part2',
  templateUrl: './pae-activities-part2.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./pae-activities-part2.component.scss'],
})
export class PaeActivitiesPart2Component implements OnInit {
  customValidation = customValidation;

  event: string;
  submitted: boolean;
  PaeActivitiesPart2Form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private refService: ReferralService,
    private router: Router,
    private customValidator: CustomvalidationService
  ) {}

  getFormData() {
    //return this.RefActivitiesPart2Form.controls;
  }

  ngOnInit(): void {
    
  }  

  saveAndExit() {
    this.event = 'SaveAndExit';
    this.saveActivitiesPart2();
  }

  next() {
    this.event = 'Next';
    this.submitted = true;
    console.log(this.getFormData());
  
  }
  
  saveActivitiesPart2() {
    
  }

  back() {
    const previousForm = 'PRAPIF';
  }
}
