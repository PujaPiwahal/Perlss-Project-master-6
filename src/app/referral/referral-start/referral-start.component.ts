import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ReferralService } from '../../core/services/referral/referral.service';
import { RefApplicantDetail } from '../../_shared/model/RefApplicantDetail';
import { ReferralFlowSeq } from '../../_shared/utility/ReferralFlowSeq';
import * as customValidation from '../../_shared/constants/validation.constants';

@Component({
  selector: 'app-referral-start',
  templateUrl: './referral-start.component.html',
  styleUrls: ['./referral-start.component.scss']
})
export class ReferralStartComponent implements OnInit {
  referralForm: FormGroup;
  isDevlopmentDisability = false;
  @Output() completedStart: EventEmitter<any> = new EventEmitter<any>();
  noneDisableSw: string = null;
  submitted = false;
  customValidation = customValidation;

  constructor(
    private fb: FormBuilder,
    private refService: ReferralService,
    private router: Router
  ) { }

  ngOnInit() {
    this.referralForm = this.fb.group({
      intelDisableSw: [''] ,
      devDisableSw: [''],
      diagnosisTxt: [''],
    });
  }

  getData() {
    return this.referralForm.controls;
  }

  next(){
    this.submitted = true;
    console.log(this.getData().diagnosisTxt);
    const intDisableSw = this.getData().intelDisableSw.value ? 'Y' : 'N';
    const dDisableSw = this.getData().devDisableSw.value ? 'Y' : 'N';
    if ( intDisableSw === 'N' && dDisableSw === 'N' ) {
      this.noneDisableSw = 'Y';
     }
     else {
      this.noneDisableSw = 'N';
    }
    console.log(this.noneDisableSw);
    const refApplicantDetail = new RefApplicantDetail(dDisableSw, this.getData().diagnosisTxt.value,
                                                      intDisableSw, this.noneDisableSw, null, '0', null,'PRSRLL');
    const nextForm = 'PRAPIF';
    console.log(this.referralForm.valid);
    console.log(this.referralForm);
    if (this.referralForm.valid) {
      this.refService.setRefApplicantDetail(refApplicantDetail);
      this.completedStart.emit(ReferralFlowSeq[nextForm]);
     }
  }

onDevlopDisablitySelect(event){
  if (event.target.checked){
    this.isDevlopmentDisability = true;
    this.getData().diagnosisTxt.setValidators([Validators.required, Validators.maxLength(2000), Validators.pattern(/^[a-zA-Z0-9_]*$/)]);
    this.getData().diagnosisTxt.updateValueAndValidity();
  }else{
    this.isDevlopmentDisability = false;
    this.getData().diagnosisTxt.clearValidators();
    this.getData().diagnosisTxt.updateValueAndValidity();
  }
}

}
