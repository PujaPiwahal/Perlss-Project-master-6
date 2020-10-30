import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { CustomvalidationService } from 'src/app/_shared/utility/customvalidation.service';
import * as customValidation from '../../_shared/constants/validation.constants';

@Component({
  selector: 'app-pae-activity-daily-living-part-two',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pae-activity-daily-living-part-two.component.html',
  styleUrls: ['./pae-activity-daily-living-part-two.component.scss']
})
export class PaeActivityDailyLivingPartTwoComponent implements OnInit {
  myForm: FormGroup;
  toggleCatheterOstomy: boolean = false;
  customValidation = customValidation;
  mobilitySubSection:boolean = false;
  toiletingSubSection:boolean = false;
  constructor(private fb: FormBuilder,
  private customValidator: CustomvalidationService) { }

  get f() {
    return this.myForm.controls;
  }
  ngOnInit(): void {
    this.myForm = this.fb.group({
      applicantIncontSw: [''],
      prefPhoneTypCd: [''],
      mobility: [''],
      catheter: [''],
      mobilitysubsection: [''],
      eating: [''],
      toileting: [''],
      performIncontient: [''],
      indvTransCrimJustTxt: ['']
    });
  }

  next() {
    // if(this.myForm.valid) {
    //
    // }
  }

  getFormData() {
    return this.myForm.controls;
  }

  onCatheter(mrChange: MatRadioChange) {
    console.log(event)
    if(mrChange.value== "Y") {
      this.toggleCatheterOstomy = true;
    } else {
      this.toggleCatheterOstomy = false;
    }
  }

  onChangeMobility(event) {
    console.log("event===", event)
    if(event == 'usuallyNot' || event =='never') {
      this.mobilitySubSection = true;
    } else {
      this.mobilitySubSection = false;
    }
  }

  onChangeToilet(mrChange: MatRadioChange) {
    if(mrChange.value== "Y") {
      this.toiletingSubSection = true;
    } else {
      this.toiletingSubSection = false;
    }
  }

}
