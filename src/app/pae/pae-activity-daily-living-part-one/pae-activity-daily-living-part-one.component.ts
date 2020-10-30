import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { CustomvalidationService } from 'src/app/_shared/utility/customvalidation.service';
import * as customValidation from '../../_shared/constants/validation.constants';
import { Router } from '@angular/router';
import { ActivityDailyLivingPartOneService } from '../../core/services/pae/pae-activity-daily-living/activity-daily-living-part-one.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-pae-activity-daily-living-part-one',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pae-activity-daily-living-part-one.component.html',
  styleUrls: ['./pae-activity-daily-living-part-one.component.scss']
})
export class PaeActivityDailyLivingPartOneComponent implements OnInit {

  activityDailyLivingForm: FormGroup;
  toggleCatheterOstomy = false;
  customValidation = customValidation;
  subWheelChairCapableCd = false;
  toiletingSubSection = false;
  submitted = false;
  emergentCircumstancesReviewForm: any;
  appointmentService: any;
  details: any;
  myForm: any;
  event: string;
  constructor(
    public dialogRef: MatDialogRef<PaeActivityDailyLivingPartOneComponent>,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private router: Router,
    private activityDailyLivingPartOneService: ActivityDailyLivingPartOneService
  ) { }

  get f() {
    return this.activityDailyLivingForm.controls;
  }

  ngOnInit(): void {
    this.activityDailyLivingForm = this.fb.group({
      transferWithoutHelpCd: ['', [Validators.required]],
      walkWithoutHelpCd: ['', [Validators.required]],
      eatWithoutHelpCd: ['', [Validators.required]],
      wheelChairCapableCd: [''],
      toiletWithoutHelpCd: ['', [Validators.required]],
      applicantIncontSw: ['', [Validators.required]],
      incontTypeCd: ['', [Validators.required]],
      incontWithoutHelpCd: ['', [Validators.required]],
      catheterOstomySw: ['', [Validators.required]],
      cathOstWithoutHelpCd: ['', [Validators.required]],
    });
  }

  getFormData() {
    return this.activityDailyLivingForm.controls;
  }

  closePopup() {
    this.dialogRef.close();
  }

  saveAndExit() {
    this.event = 'SaveAndExit';
    //this.activityDailyLivingForm(true);
  }

  async onSubmit() {
    try {
      console.log('before on submit function', this.emergentCircumstancesReviewForm.valid);
      this.submitted = true;
      if (this.activityDailyLivingForm.valid) {
        const response = await this.activityDailyLivingPartOneService.addPaeActivitiesLiving({
          ...this.activityDailyLivingForm.value,
        });
        console.log('inside on submit function');
      }
    } catch (e) {
      console.log(e);
    }
  }

  next() {
    this.submitted = true;
    if (this.myForm.valid) {
    }
  }

  onChangecatheterOstomySw(mrChange: MatRadioChange) {
    if (mrChange.value === 'Y') {
      this.toggleCatheterOstomy = true;
    } else {
      this.toggleCatheterOstomy = false;
    }
  }

  onChangewalkWithoutHelpCd(event) {
    if (event === 'usuallyNot' || event === 'never') {
      this.subWheelChairCapableCd = true;
    } else {
      this.subWheelChairCapableCd = false;
    }
  }

  onChangeapplicantIncontSw(mrChange: MatRadioChange) {
    if (mrChange.value === 'Y') {
      this.toiletingSubSection = true;
    } else {
      this.toiletingSubSection = false;
    }
  }

  saveForm(form) {
    const data = '';
    if (this.activityDailyLivingPartOneService.valid && this.submitted) {
      const response = this.activityDailyLivingPartOneService.addPaeActivitiesLiving(form);
      response.then(data => {
        data = data.body;
        this.closePopup();
        console.log(data);
      });
    }

}
}

