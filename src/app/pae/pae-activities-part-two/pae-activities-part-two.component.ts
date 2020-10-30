
import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferralService } from '../../core/services/referral/referral.service';
import { Router } from '@angular/router';
import * as customValidation from '../../_shared/constants/validation.constants';
import { CustomvalidationService } from '../../_shared/utility/customvalidation.service';

@Component({
  selector: 'pae-activities-part-two',
  templateUrl: './pae-activities-part-two.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./pae-activities-part-two.component.scss'],
})
export class PaeActivitiesPartTwoComponent implements OnInit {
  customValidation = customValidation;

  event: string;
  submitted: boolean;
  paeActivitiesPartTwoForm: FormGroup;
  groomingNoneValid: boolean = true;
  dressingNoneValid: boolean = true;
  nextClicked: boolean;

  constructor(
    private fb: FormBuilder,
    private refService: ReferralService,
    private router: Router,
    private customValidator: CustomvalidationService
  ) { }

  ngOnInit(): void {
    this.paeActivitiesPartTwoForm = this.fb.group({

      comabativeRR: [''],
      combativeCR: [''],
      washingRR: [''],
      washingRC: [''],
      groomingRR: [''],
      groomingRC: [''],
      groomingNone: [''],
      dressingRR: [''],
      dressingRC: [''],
      cueingRR: [''],
      cueingRC: [''],
      dressingNone: [''],
      learning: ['', [Validators.required]],
      expressiveCommunication: ['', [Validators.required]],
      receptiveCommunication: ['', [Validators.required]]
    });
  }

  getFormData() {
    return this.paeActivitiesPartTwoForm.controls;
  }


  saveAndExit() {
    this.event = 'SaveAndExit';
    this.validate();
    this.saveActivitiesPartTwo();
  }

  next() {
    this.event = 'Next';
    this.validate();
    this.submitted = true;
  }

  public onNextClick(): void {
    this.nextClicked = true;
  }

  public onSaveAndExitClick(): void {
    this.nextClicked = false;
  }

  onSubmit(): void {
    if (this.nextClicked) {
      this.next();
    }
    else {
      this.saveAndExit();
    }
  }

  saveActivitiesPartTwo() {

    if (this.validate()) {
      //saveform
    }
  }

  validate(): boolean {
    this.groomingNoneValid = this.validateList([
      "groomingNone",
      "comabativeRR",
      "combativeCR",
      "washingRR",
      "washingRC",
      "groomingRR",
      "groomingRC",
      "cueingRR",
      "cueingRC"
    ]);

    this.dressingNoneValid = this.validateList([
      "dressingNone",
      "dressingRR",
      "dressingRC"
    ]);
    this.getControl("learning").markAsTouched();
    this.getControl("expressiveCommunication").markAsTouched();
    this.getControl("receptiveCommunication").markAsTouched();

    return this.groomingNoneValid && this.dressingNoneValid && this.paeActivitiesPartTwoForm.valid;
  }

  getControl(name: string): AbstractControl {
    return this.paeActivitiesPartTwoForm.get(name);
  }

  validateList(controlNames: Array<string>): boolean {
    var valid = false;
    var that = this;

    controlNames.forEach((element: string) => {
      var control = that.getControl(element);
      if (control.value) {
        valid = true;
      }
    });
    return valid;
  }

  back() {
    const previousForm = 'PRAPIF';
  }
}
