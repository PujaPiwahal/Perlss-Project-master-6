import { CustomvalidationService } from '../_shared/utility/customvalidation.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RefSchAndWork } from '../_shared/model/RefSchAndWork';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ReferralService } from '../core/services/referral/referral.service';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {SavePopupComponent} from '../savePopup/savePopup.component';
import { HttpResponse } from '@angular/common/http';
import { ReferralFlowSeq } from '../_shared/utility/ReferralFlowSeq';
import { Validators } from '@angular/forms';
import * as customValidation from '../_shared/constants/validation.constants';

@Component({
  selector: 'app-referral-school-work',
  templateUrl: './referral-school-work.component.html',
  styleUrls: ['./referral-school-work.component.scss']
})
export class ReferralSchoolWorkComponent implements OnInit {
  @Output() completedSchoolWork: EventEmitter<any> = new EventEmitter<any>();
  inSchool = false;
  submitted = false;
  schAndWorkForm: FormGroup;
  hlthDisSw = false;
  jobNowSw: string;
  jobOfferSw: string;
  lostJobSw: string;
  noJobSw: string;
  noJobExplWorkSw: string;
  noWorkIntrstSw: string;
  nextPath: string;
  nextForm: string;
  event: string;
  customValidation = customValidation;
  // jobVocRehabSw: string;

  age: number;
  constructor(
    private fb: FormBuilder,
    private router: Router, 
    private referralService: ReferralService,
    private dialog: MatDialog,
    private customValidator: CustomvalidationService
  ) { }

  ngOnInit(): void {
    this.schAndWorkForm = this.fb.group({
      curSchoolSw: ['', [Validators.required]],
      leaveHsPsSw: ['', [Validators.required]],
      vocRehabSw: ['', [Validators.required]],
      srvcCallExplreSw: ['', [Validators.required]],
      jobSW: ['', [Validators.required]],
      empName: ['', [Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z-( )]+$')]],
      jobEndDt: ['', [Validators.required, Validators.pattern('[0-1][0-9]/[1-2][0-9][0-9][0-9]')]],
      jobEndReasonCd: ['', [Validators.required]],
      needSrvcsForJobSw: ['', [Validators.required]],
      hlthDisbltySw: [''],
      needhelpSW: [''],
      jobVocRehabSw: ['', [Validators.required]],
    });
  }
  saveSchoolAndWork(showPopup?: boolean) {
    const refId = this.referralService.getRefId();
    const personId = this.referralService.getPersonId();
    const refSchAndWork = new RefSchAndWork(
      this.getFormData().curSchoolSw.value,
      this.getFormData().empName.value,
      this.getFormData().hlthDisbltySw.value,
      null,
      this.getFormData().jobEndDt.value,
      this.getFormData().jobEndReasonCd.value,
      this.jobNowSw,
      this.getFormData().jobVocRehabSw.value,
      this.getFormData().leaveHsPsSw.value,
      this.getFormData().needhelpSW.value,
      this.getFormData().needSrvcsForJobSw.value,
      refId,
      'PRSAWK',
      this.getFormData().srvcCallExplreSw.value, this.getFormData().vocRehabSw.value,
      personId
      );

    const response = this.referralService.saveReferralSchAndWork(refSchAndWork);
    this.nextForm = 'PRCNSP';
    const that = this;
    response.then(function(response: HttpResponse<any>) {
      if (showPopup) {
        this.showPopup();
      } else {
        that.nextForm = response.headers.get('next');
      response = response.body;
        that.nextPath = ReferralFlowSeq[that.nextForm];
      if( that.event === 'Next' ){
          this.completedSchoolWork.emit(ReferralFlowSeq[that.nextForm]);
        }
      }
    });
  }

  getFormData() {
    return this.schAndWorkForm.controls;
  }
  onCurSchool(event) {
    if (event.value === 'Y') {
      this.inSchool = true;
      this.getFormData().curSchoolSw.setValidators([Validators.required]);
      this.getFormData().curSchoolSw.updateValueAndValidity();
      this.getFormData().leaveHsPsSw.setValidators([Validators.required]);
      this.getFormData().leaveHsPsSw.updateValueAndValidity();
      this.getFormData().vocRehabSw.setValidators([Validators.required]);
      this.getFormData().vocRehabSw.updateValueAndValidity();
      this.getFormData().jobVocRehabSw.setValidators([Validators.required]);
      this.getFormData().jobVocRehabSw.updateValueAndValidity();
    } else {
      this.inSchool = false;
      this.getFormData().curSchoolSw.clearValidators();
      this.getFormData().curSchoolSw.updateValueAndValidity();
      this.getFormData().leaveHsPsSw.clearValidators();
      this.getFormData().leaveHsPsSw.updateValueAndValidity();
      this.getFormData().vocRehabSw.clearValidators();
      this.getFormData().vocRehabSw.updateValueAndValidity();
      this.getFormData().jobVocRehabSw.clearValidators();
      this.getFormData().jobVocRehabSw.updateValueAndValidity();
    }
  }

  onHeathDisablity(event) {
    if (event.value === 'Y') {
      this.hlthDisSw = true;
    } else {
      this.hlthDisSw = false;
    }
  }

  onJobOptSelection(event) {
    if (event.value === 'jobNow') {
      this.jobNowSw = 'Y';
      this.jobNowSetValidators();
    }
     else {
        this.jobNowSw = 'N';      
        this.jobNowClearValidators();

        if(event.value === 'jobOfferSw') {
          this.jobOfferSetValidators();
        }
        else if(event.value === 'lostJobSW'){
          this.lostJobSetValidators();
        }
      }

    if (event.value === 'jobOfferSW') {
      this.jobOfferSw = 'Y';   
      this.jobOfferSetValidators();
    } 
      else {
        this.jobOfferSw = 'N';
        this.jobOfferClearValidators();

        if(event.value === 'jobNow') {
          this.jobNowSetValidators();
        }
        else if(event.value === 'lostJobSW'){
          this.lostJobSetValidators();
        }
      }


    if (event.value === 'lostJobSW') {
      this.lostJobSw = 'Y';
      this.lostJobSetValidators();
    } 
      else {
        this.lostJobSw = 'N';
        this.lostJobClearValid();
        if(event.value === 'jobNow') {
          this.jobNowSetValidators();
        }
        else if(event.value === 'jobOfferSw'){
          this.jobOfferSetValidators();
        }
      }

    if (event.value === 'needJobHelp') {
      this.noJobSw = 'Y';
    } else {
      this.noJobSw = 'N';
    }
    
    if (event.value === 'noJobExplore') {
      this.noJobExplWorkSw = 'Y';
      this.getFormData().srvcCallExplreSw.setValidators([Validators.required]);
      this.getFormData().srvcCallExplreSw.updateValueAndValidity();
    } else {
      this.noJobExplWorkSw = 'N';
      this.getFormData().srvcCallExplreSw.clearValidators();
      this.getFormData().srvcCallExplreSw.updateValueAndValidity();
    }
    if (event.value === 'notIntrestedInWork') {
      this.noWorkIntrstSw = 'Y';
    } else {
      this.noWorkIntrstSw = 'N';
    }
  }

  jobNowSetValidators() {
    this.getFormData().empName.setValidators([Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z-( )]+$')]);
    this.getFormData().empName.updateValueAndValidity();
    this.getFormData().needSrvcsForJobSw.setValidators([Validators.required]);
    this.getFormData().needSrvcsForJobSw.updateValueAndValidity();
  }
  
  jobNowClearValidators() {
    this.getFormData().empName.clearValidators();
    this.getFormData().empName.updateValueAndValidity();
    this.getFormData().needSrvcsForJobSw.clearValidators();
    this.getFormData().needSrvcsForJobSw.updateValueAndValidity();
  }
  
  lostJobClearValid() {
    this.getFormData().empName.clearValidators();
    this.getFormData().empName.updateValueAndValidity();
    this.getFormData().jobEndDt.clearValidators();
    this.getFormData().jobEndDt.updateValueAndValidity();
    this.getFormData().jobEndReasonCd.clearValidators();
    this.getFormData().jobEndReasonCd.updateValueAndValidity();
  }
  
  lostJobSetValidators() {
    this.getFormData().empName.setValidators([Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z-( )]+$')]);
    this.getFormData().empName.updateValueAndValidity();
    this.getFormData().jobEndDt.setValidators([Validators.required, Validators.pattern('[0-1][0-9]/[1-2][0-9][0-9][0-9]')]);
    this.getFormData().jobEndDt.updateValueAndValidity();
    this.getFormData().jobEndReasonCd.setValidators([Validators.required]);
    this.getFormData().jobEndReasonCd.updateValueAndValidity();
  }
  
  jobOfferClearValidators() {
    this.getFormData().empName.clearValidators();
    this.getFormData().empName.updateValueAndValidity();
  }
  jobOfferSetValidators() {
    this.getFormData().empName.setValidators([Validators.required, Validators.maxLength(100), Validators.pattern('^[a-zA-Z-( )]+$')]);
    this.getFormData().empName.updateValueAndValidity();
  }
  


  saveAndExit() {
    this.event='SaveAndExit';
    this.submitted = true;
    this.saveSchoolAndWork(true);
  }
  showPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { route: 'dashboard/referral' };
    dialogConfig.panelClass="exp_popup";
    dialogConfig.width = "500px";
    this.dialog.open(SavePopupComponent, dialogConfig );
  }

  next() {
    this.event='Next';
    this.submitted = true;
    this.saveSchoolAndWork();
    console.log(this.schAndWorkForm);
  }

  back() {
    const previousForm = 'PRCIFO';
    this.completedSchoolWork.emit(ReferralFlowSeq[previousForm]);
  }

}
