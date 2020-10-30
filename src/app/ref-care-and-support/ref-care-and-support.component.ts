import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferralService } from '../core/services/referral/referral.service';
import { MatRadioChange } from '@angular/material/radio';
import { RefCareAndSupport } from '../_shared/model/RefCareAndSupport';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {SavePopupComponent} from '../savePopup/savePopup.component';
import { HttpResponse } from '@angular/common/http';
import { ReferralFlowSeq } from '../_shared/utility/ReferralFlowSeq';
import * as customValidation from '../_shared/constants/validation.constants';
import { CustomvalidationService } from '../_shared/utility/customvalidation.service';

@Component({
  selector: 'app-ref-care-and-support',
  templateUrl: './ref-care-and-support.component.html',
  styleUrls: ['./ref-care-and-support.component.scss'],
})
export class RefCareAndSupportComponent implements OnInit {
  @Output() completedCareAndSupport: EventEmitter<any> = new EventEmitter<any>();
  customValidation = customValidation;
  submitted = false;
  refCareAndSuppportForm: FormGroup;
  primaryCareGiverSW = false;
  age: number;
  notPrimaryCareGiverSW = false;
  abuseNeglectedSW = false;
  physicalHurtSW = false;
  nextPath: string;
  event: string;
  minDate: Date;
  maxDate: Date;
  birthdayString: string = null;
  onPrimaryCareGiverNone = false;
  primaryCheckboxSelectedCount = 0;
  needHelpCheckboxSelectedCount = 0;
  behaviourChangeCheckboxSelectedCount = 0;
  behaviourChangeSelected = false;
  primaryCareGiverDescriptionSelected = false;
  needHelpSelected = false;
  needHelpNoneSelected = false;
  behaviourChangeNone = false;
  constructor(
    private fb: FormBuilder,
    private refService: ReferralService,
    private dialog: MatDialog,
    private customValidator: CustomvalidationService
  ) {}
  getFormData() {
    return this.refCareAndSuppportForm.controls;
  }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 119, 0, 1);
    this.maxDate = new Date();
    this.refCareAndSuppportForm = this.fb.group({
      abuseNeglectedSw: ['', [Validators.required]],
      adultProtectServSw: [''],
      anotherCareGiverSw: ['', [Validators.required]],
      antrPlaceSw: [''],
      age: [''],
      behaNoneSw: [null],
      behaServicesSw: [''],
      careGiverBirthDt: [''],
      careGiverDiedSw: [''],
      careGiverName: [''],
      careGiverRelCd: [''],
      childProtectServSw: [''],
      cleaningDressSw: [''],
      criminalJustSw: [''],
      eatingSw: [''],
      goodDecisionsSafeSw: [''],
      knowFamilySw: [''],
      medicinesSw: [''],
      mentalHlthCrisisSw: [''],
      noneOfAboveSw: [''],
      personHelpNoneSw: [''],
      physHurtBehaSw: ['', [Validators.required]],
      primCaregiverSw: ['', [Validators.required]],
      primCrgiverDisablSw: [''],
      primCrgvrPoorHlthSw: [''],
      psychHospSw: [''],
      resTreatProgSw: [''],
      tellingOthersSw: [''],
      transferBedChairToilSw: [''],
      underSimpleInstSw: [''],
      walkWheelchairSw: [''],
      toiletingSw: [''],
    });
  }

  saveRefarralCareAndSupport(showPopup?: boolean)  {
    const refId = this.refService.getRefId();
    const personId = this.refService.getPersonId();
    const refCareAndSupport = new RefCareAndSupport(
      this.getFormData().abuseNeglectedSw.value,
      this.getFormData().adultProtectServSw.value,
      this.getFormData().anotherCareGiverSw.value,
      this.getFormData().antrPlaceSw.value,
      this.age,
      this.sendingYorN(this.getFormData().behaNoneSw.value),
      this.sendingYorN(this.getFormData().behaServicesSw.value),
      this.birthdayString,
      this.getFormData().careGiverDiedSw.value,
      this.getFormData().careGiverName.value,
      this.getFormData().careGiverRelCd.value,
      this.sendingYorN(this.getFormData().childProtectServSw.value),
      this.sendingYorN(this.getFormData().cleaningDressSw.value),
      null,
      this.sendingYorN(this.getFormData().criminalJustSw.value),
      this.sendingYorN(this.getFormData().eatingSw.value),
      this.sendingYorN(this.getFormData().goodDecisionsSafeSw.value),
      this.sendingYorN(this.getFormData().knowFamilySw.value),
      this.sendingYorN(this.getFormData().medicinesSw.value),
      this.sendingYorN(this.getFormData().mentalHlthCrisisSw.value),
      this.sendingYorN(this.getFormData().noneOfAboveSw.value),
      this.sendingYorN(this.getFormData().personHelpNoneSw.value),
      this.getFormData().physHurtBehaSw.value,
      this.getFormData().primCaregiverSw.value,
      this.sendingYorN(this.getFormData().primCrgiverDisablSw.value),
      this.sendingYorN(this.getFormData().primCrgvrPoorHlthSw.value),
      this.sendingYorN(this.getFormData().psychHospSw.value),
      this.sendingYorN(this.getFormData().resTreatProgSw.value),
      this.sendingYorN(this.getFormData().tellingOthersSw.value),
      personId,
      this.sendingYorN(this.getFormData().transferBedChairToilSw.value),
      this.sendingYorN(this.getFormData().underSimpleInstSw.value),
      this.sendingYorN(this.getFormData().walkWheelchairSw.value),
      refId,
      'PRCNSP'
    );

    const response = this.refService.saveRefCareAndSupport(refCareAndSupport);
    let nextForm = 'PRSRFR';
    const that = this;
    response.then(function(response: HttpResponse<any>) {
      if (showPopup) {
      	this.showPopup();
      } else {
      	nextForm = response.headers.get('next');
      	response = response.body;
     	that.nextPath = ReferralFlowSeq[nextForm];
        if (that.event === 'Next') {
          that.completedCareAndSupport.emit(ReferralFlowSeq[nextForm]);
        }
      }
    });
  }

  saveAndExit() {
    this.event = 'SaveAndExit';
    this.submitted = true;
    this.saveRefarralCareAndSupport(true);
  }

  showPopup() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { route: 'dashboard/referral' };
    dialogConfig.panelClass="exp_popup";
    dialogConfig.width = "500px";
    this.dialog.open(SavePopupComponent, dialogConfig );
  }

  next() {
    this.event = 'Next';
    this.submitted = true;
    if ( this.refCareAndSuppportForm.valid ){
        this.saveRefarralCareAndSupport();
    }

  }

  back() {
    const previousForm = 'PRSAWK';
    this.completedCareAndSupport.emit(ReferralFlowSeq[previousForm]);
  }

  sendingYorN(input: boolean) {
    if (input === true) {
      return 'Y';
    } else if (input === false) {
      return 'N';
    }
  }

  calculateAge(event) {
    const today = new Date();
    const birthDate = new Date(event.value);
    this.birthdayString = birthDate.toJSON();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.age = age;
  }

  onPrimaryCareGiverChange(mrChange: MatRadioChange) {
    if (mrChange.value === 'Y') {
      this.primaryCareGiverSW = true;
      this.notPrimaryCareGiverSW = false;
      this.setValidationsCareGiver();
      this.removeValidationsCareGiverDied();
    } else if (mrChange.value === 'N') {
      this.notPrimaryCareGiverSW = true;
      this.primaryCareGiverSW = false;
      this.removeValidationsCareGiver();
      this.setValidationsCareGiverDied();
    }
  }

  onAbuseNeglectedChange(mrChange: MatRadioChange) {
    if (mrChange.value === 'Y') {
      this.abuseNeglectedSW = true;
      this.getFormData().antrPlaceSw.setValidators([Validators.required]);
      this.getFormData().antrPlaceSw.updateValueAndValidity();
    } else if (mrChange.value === 'N') {
      this.abuseNeglectedSW = false;
      this.getFormData().antrPlaceSw.clearValidators();
      this.getFormData().antrPlaceSw.updateValueAndValidity();
    }
  }

  onPhysicalHurtBehaviourChange(mrChange: MatRadioChange) {
    if (mrChange.value === 'Y') {
      this.physicalHurtSW = true;
      this.getFormData().behaServicesSw.setValidators([Validators.required]);
      this.getFormData().behaServicesSw.updateValueAndValidity();
    } else if (mrChange.value === 'N') {
      this.physicalHurtSW = false;
      this.getFormData().behaServicesSw.clearValidators();
      this.getFormData().behaServicesSw.updateValueAndValidity();
    }
  }

  setValidationsCareGiver() {
    this.getFormData().careGiverName.setValidators([
      Validators.required,
      Validators.maxLength(100),
      this.customValidator.nameValidator(),
    ]);
    this.getFormData().careGiverBirthDt.setValidators([Validators.required]);
    this.getFormData().careGiverRelCd.setValidators([Validators.required]);
    this.getFormData().careGiverName.updateValueAndValidity();
    this.getFormData().careGiverBirthDt.updateValueAndValidity();
    this.getFormData().careGiverRelCd.updateValueAndValidity();
  }

  removeValidationsCareGiver() {
    this.getFormData().careGiverName.clearValidators();
    this.getFormData().careGiverBirthDt.clearValidators();
    this.getFormData().careGiverRelCd.clearValidators();
    this.getFormData().careGiverName.updateValueAndValidity();
    this.getFormData().careGiverBirthDt.updateValueAndValidity();
    this.getFormData().careGiverRelCd.updateValueAndValidity();
  }

  setValidationsCareGiverDied(){
    this.getFormData().careGiverDiedSw.setValidators([Validators.required]);
    this.getFormData().careGiverDiedSw.updateValueAndValidity();
  }

  removeValidationsCareGiverDied(){
    this.getFormData().careGiverDiedSw.clearValidators();
    this.getFormData().careGiverDiedSw.updateValueAndValidity();
  }

  onPrimaryCareGiverDescription(event) {
    if (event.checked) {
      this.primaryCheckboxSelectedCount = this.primaryCheckboxSelectedCount + 1;
    }
    else if (!event.checked) {
      this.primaryCheckboxSelectedCount = this.primaryCheckboxSelectedCount - 1;
    }
    if (this.primaryCheckboxSelectedCount > 0) {
      this.primaryCareGiverDescriptionSelected = true;
    }
    else {
      this.primaryCareGiverDescriptionSelected = false;
    }
  }

  onNeedHelp(event){
    if (event.checked) {
      this.needHelpCheckboxSelectedCount = this.needHelpCheckboxSelectedCount + 1;
    }
    else if (!event.checked) {
      this.needHelpCheckboxSelectedCount = this.needHelpCheckboxSelectedCount - 1;
    }
    if (this.needHelpCheckboxSelectedCount > 0) {
      this.needHelpSelected = true;
    }
    else {
      this.needHelpSelected = false;
    }
  }

  onBehaviourChange(event) {
    if (event.checked) {
      this.behaviourChangeCheckboxSelectedCount = this.behaviourChangeCheckboxSelectedCount + 1;
    }
    else if (!event.checked) {
      this.behaviourChangeCheckboxSelectedCount = this.behaviourChangeCheckboxSelectedCount - 1;
    }
    if (this.behaviourChangeCheckboxSelectedCount > 0) {
      this.behaviourChangeSelected = true;
    }
    else {
      this.behaviourChangeSelected = false;
    }
  }
  onBehaviourChangeNone(event) {
    if (event.checked) {
      this.behaviourChangeNone = true;
    }
    else if (!event.checked) {
      this.behaviourChangeNone = false;
    }
  }

  onNeedHelpNoneSelected(event){
    if (event.checked) {
      this.needHelpNoneSelected = true;
    }
    else if (!event.checked) {
      this.needHelpNoneSelected = false;
    }
  }

  onPrimaryCareGiverNoneDescription(event){
    if (event.checked) {
      this.onPrimaryCareGiverNone = true;
    }
    else if (!event.checked) {
      this.onPrimaryCareGiverNone = false;
    }
  }
}
