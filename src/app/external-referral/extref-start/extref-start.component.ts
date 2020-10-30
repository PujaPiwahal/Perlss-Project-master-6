import { Component, EventEmitter, OnInit, Output  } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RefApplicantDetail } from '../../_shared/model/RefApplicantDetail';
import { ReferralFlowSeq } from '../../_shared/utility/ReferralFlowSeq';
import * as customValidation from '../../_shared/constants/validation.constants';
import { ExternalreferralService } from '../services/externalreferral.service';

@Component({
  selector: 'app-extref-start',
  templateUrl: './extref-start.component.html',
  styleUrls: ['./extref-start.component.scss']
})
export class ExtrefStartComponent implements OnInit {
  referralForm: FormGroup;
  isDevlopmentDisability = false;
  @Output() completedStart: EventEmitter<any> = new EventEmitter<any>();
  noneDisableSw: string = null;
  submitted = false;
  customValidation = customValidation;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private extRefService: ExternalreferralService) {}

  ngOnInit(){
    this.referralForm = this.fb.group({
      intelDisableSw: [''] ,
      devDisableSw: [''],
      diagnosisTxt: [''],
    });
    this.extRefService.stepReady(this.referralForm,"one");
  }
  
  getData() {
    return this.referralForm.controls;
  }
  next(){
    this.submitted = true;
    const intDisableSw = this.getData().intelDisableSw.value ? 'Y' : 'N';
    const dDisableSw = this.getData().devDisableSw.value ? 'Y' : 'N';
    if ( intDisableSw === 'N' && dDisableSw === 'N' ) {
      this.noneDisableSw = 'Y';
     }
     else {
      this.noneDisableSw = 'N';
    }
    // const refApplicantDetail = new RefApplicantDetail(dDisableSw, this.getData().diagnosisTxt.value,
    //                                                   intDisableSw, this.noneDisableSw, null, '0', null,'PRSRLL');
                                                 
    //const nextForm = 'PRAPIF';
    //if (this.referralForm.valid) {
       //this.completedStart.emit(ReferralFlowSeq[nextForm]);
      //}
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
