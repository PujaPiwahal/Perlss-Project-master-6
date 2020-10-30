import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ReferralService } from '../core/services/referral/referral.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RefSubmission } from '../_shared/model/RefSubmission';
import { HttpResponse } from '@angular/common/http';
import { ReferralFlowSeq } from '../_shared/utility/ReferralFlowSeq';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SavePopupComponent } from '../savePopup/savePopup.component';
import * as customValidation from '../_shared/constants/validation.constants';
import { CustomvalidationService } from '../_shared/utility/customvalidation.service';

@Component({
  selector: 'app-referral-submit',
  templateUrl: './referral-submit.component.html',
  styleUrls: ['./referral-submit.component.scss']
})
export class ReferralSubmitComponent implements OnInit {
  @Output() completedSubmit: EventEmitter<any> = new EventEmitter<any>();
  event: string;
  refSubmissionForm: FormGroup;
  customValidation = customValidation;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private referralService: ReferralService,
    private customValidator: CustomvalidationService,
    private dialog: MatDialog
  ) { }

  submitter: string;
  contactPerson: string;
  nextPath: string;
  ngOnInit(): void {
    this.refSubmissionForm = this.fb.group({
      whoIsSubmittingCd: ['', [Validators.required]],
      relationshipCd: [''],
      expeditedReviewSw: [''],
      admissionDt:[''],
      planTransitionDt: [''],
      refContactCd: ['', [Validators.required]],
      refContactName: [''],
      othRelationshipCd: [''],
      emailAddr: [''],
      phNum: [''],
      signature: ['', [Validators.required]]

    });
  }

  getFormData() {
    return this.refSubmissionForm.controls;
  }

  saveAndExit() {
    this.event = 'SaveAndExit';
    this.saveRefSubmission(true);
  }
  showPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { route: 'dashboard/referral' };
    dialogConfig.panelClass="exp_popup";
    dialogConfig.width = "500px";
    this.dialog.open(SavePopupComponent, dialogConfig);
  }

  next() {
    this.event = 'Next';
    console.log(this.getFormData());
    if (this.refSubmissionForm.valid) {
      this.saveRefSubmission();
    }
  }

  back() {
    const previousForm = 'PRCNSP';
    this.completedSubmit.emit(ReferralFlowSeq[previousForm]);
  }

  saveRefSubmission(showPopup? : boolean) {
    const refId = this.referralService.getRefId();
    const refSubmission = new RefSubmission(null,
      this.getFormData().admissionDt.value,
      this.getFormData().emailAddr.value,
      this.getFormData().expeditedReviewSw.value,
      this.getFormData().othRelationshipCd.value,
      this.getFormData().phNum.value,
      this.getFormData().planTransitionDt.value,
      this.getFormData().refContactCd.value,
      this.getFormData().refContactName.value,
      refId,
      this.getFormData().relationshipCd.value,
      this.getFormData().signature.value,
      this.getFormData().whoIsSubmittingCd.value,
      'PRSRFR');

    this.referralService.saveReferralSubmission(refSubmission);
    const response = this.referralService.saveReferralSubmission(refSubmission);
    let nextPage = '';
    const that = this;
    response.then(function(response: HttpResponse<any>) {
      if(showPopup) {
        this.showPopup();
      } else {
      nextPage = response.headers.get('next');
      response = response.body;
      that.nextPath = ReferralFlowSeq[nextPage];
      if (that.event === 'Next') {
         that.router.navigate(['/dashboard/' + that.nextPath]);
        }
      }
    });
  }

  get f() {
    return this.refSubmissionForm.controls;
  }

  onSelect(event){
    this.submitter = event.target.value;
    if (event.target.value === 'FAML'  || event.target.value === 'OTHR'){
        this.setFamilyValidations();
        } else if (event.target.value === 'MCO') {
        this.setMcoValidations();
        this.clearFamilyValidations();
        }
        else {
          this.clearSelfValidation();
        }
  }

  setFamilyValidations(){
    this.refSubmissionForm.get('relationshipCd').setValidators(Validators.required);
    this.refSubmissionForm.get('refContactName').setValidators(Validators.required);
    this.refSubmissionForm.get('othRelationshipCd').setValidators(Validators.required);
    this.refSubmissionForm.get('phNum').setValidators([Validators.required,
      Validators.maxLength(10), this.customValidator.phonenumberValidator()]);
    this.refSubmissionForm.get('relationshipCd').updateValueAndValidity();
    this.refSubmissionForm.get('refContactName').updateValueAndValidity();
    this.refSubmissionForm.get('othRelationshipCd').updateValueAndValidity();
    this.refSubmissionForm.get('phNum').updateValueAndValidity();
  }
  clearFamilyValidations(){
    this.refSubmissionForm.get('relationshipCd').clearValidators();
    this.refSubmissionForm.get('refContactName').clearValidators();
    this.refSubmissionForm.get('othRelationshipCd').clearValidators();
    this.refSubmissionForm.get('phNum').clearValidators();
    this.refSubmissionForm.get('relationshipCd').updateValueAndValidity();
    this.refSubmissionForm.get('refContactName').updateValueAndValidity();
    this.refSubmissionForm.get('othRelationshipCd').updateValueAndValidity();
    this.refSubmissionForm.get('phNum').updateValueAndValidity();

  }
  setMcoValidations(){
    this.refSubmissionForm.get('expeditedReviewSw').setValidators(Validators.required);
    this.refSubmissionForm.get('admissionDt').setValidators(Validators.required);
    this.refSubmissionForm.get('planTransitionDt').setValidators(Validators.required);
    this.refSubmissionForm.get('expeditedReviewSw').updateValueAndValidity();
    this.refSubmissionForm.get('admissionDt').updateValueAndValidity();
    this.refSubmissionForm.get('planTransitionDt').updateValueAndValidity();
  }
  clearMcoValidations(){
    this.refSubmissionForm.get('expeditedReviewSw').clearValidators();
    this.refSubmissionForm.get('admissionDt').clearValidators();
    this.refSubmissionForm.get('planTransitionDt').clearValidators();
    this.refSubmissionForm.get('expeditedReviewSw').updateValueAndValidity();
    this.refSubmissionForm.get('admissionDt').updateValueAndValidity();
    this.refSubmissionForm.get('planTransitionDt').updateValueAndValidity();

  }

  clearSelfValidation(){
    this.clearFamilyValidations();
    this.clearMcoValidations();
  }

  onContactPersonSelect(event){
    this.contactPerson = event.target.value;
  }
}
