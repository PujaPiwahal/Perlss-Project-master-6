import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidation from '../../../_shared/constants/validation.constants';
import { CustomvalidationService } from '../../../_shared/utility/customvalidation.service';
import { ɵNullViewportScroller } from '@angular/common';
import { RefEmergentCircumstancesReview } from './../../../_shared/model/Forms/RefEmergentCircumstancesReview';
import { EmergentCircumstancesFormservice } from './../../../core/services/referral/referral-intake/Emergent-Circumstances-Form.service';

@Component({
  selector: 'app-emergent-circumstances-review-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './emergent-circumstances-review-form.component.html',
  styleUrls: ['./emergent-circumstances-review-form.component.scss']
})
export class EmergentCircumstancesReviewFormComponent implements OnInit {
  [x: string]: any;
  emergentCircumstancesReviewForm: FormGroup;
  submitted = false;
  reqPageId: string;
  customValidation = customValidation;
  constructor(
    public dialogRef: MatDialogRef<EmergentCircumstancesReviewFormComponent>,
    private fb: FormBuilder,
    private emergentCircumstancesFormservice: EmergentCircumstancesFormservice,
    private customValidator: CustomvalidationService,
  ) { }

  ngOnInit(): void {
    this.emergentCircumstancesReviewForm = this.fb.group({
          reqPageId: ['', [Validators.required]],
          intakeOutcomeId: ['', [Validators.required]],
          abuseCurrLivSw: ['', [Validators.required]],
          adaptBehLsaResSw: [null],
          addCurrEmrgTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
          adltTransCustdySw: ['', [Validators.required]],
          anticipateChngSupTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
          behHlthCrisisPrevSw: ['', [Validators.required]],
          caregvrPermIncapSw: ['', [Validators.required]],
          caregvrRecentIncapSw: ['', [Validators.required]],
          criticalCircumTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
          currTreatBehCondTxt: ['', [Validators.required]],
          electronicSignature: ['',[Validators.required, this.customValidator.nameValidator(), Validators.maxLength(65)]],
          enrolEcfTranLongSw: ['', [Validators.required]],
          howPersonIsSuppTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
          intAssessorObservTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
          justification: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
          legalDocumentsSw: [null],
          optTriedNotWorkTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
          otherDesc: [''],
          otherSw: [ɵNullViewportScroller],
          othrSuppAvailTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
          ovr21AdltEnrolEcfSw: ['', [Validators.required]],
          physClinicalNoteSw: [null],
          rcntEvntCurCircuTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
          servUrgntNeededSw: ['', [Validators.required]],
          supportNeededTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
          verifTrgtPoplationSw: [null]
    });
  }

  getFormData() {
    return this.emergentCircumstancesReviewForm.controls;
  }

  closePopup() {
    this.dialogRef.close();
  }

  onDocumentCheck(event) {

  }

  onOtherDocumentsCheck(event) {
    if (event.checked) {
      this.getFormData().otherDesc.setValidators([Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]);
      this.getFormData().otherDesc.updateValueAndValidity();
    }
    else {
      this.getFormData().otherDesc.clearValidators();
      this.getFormData().otherDesc.updateValueAndValidity();
    }
  }
  async onSubmit() {
    try {
      console.log('before on submit function', this.emergentCircumstancesReviewForm.valid);
      this.submitted = true;
      if (this.emergentCircumstancesReviewForm.valid) {
        const response = await this.emergentCircumstancesFormservice.saveEmergentCircunstancesForm({
          ...this.emergentCircumstancesReviewForm.value,
          legalDocumentsSw: this.sendingYesorNo(this.getFormData().legalDocumentsSw.value),
          adaptBehLsaResSw: this.sendingYesorNo(this.getFormData().adaptBehLsaResSw.value),
          physClinicalNoteSw: this.sendingYesorNo(this.getFormData().physClinicalNoteSw.value),
          verifTrgtPoplationSw: this.sendingYesorNo(this.getFormData().verifTrgtPoplationSw.value),
          otherSw: this.sendingYesorNo(this.getFormData().otherSw.value),
        });
        console.log('inside on submit function');
      }
    } catch (e) {
      console.log(e);
    }
  }

  sendingYesorNo(input: boolean) {
    if (input === true) {
      return 'Y';
    } else if (input === false) {
      return 'N';
    }
    else {
      return null;
    }
  }

  saveForm(form) {
    const data = '';
    if (this.emergentCircumstancesReviewForm.valid && this.submitted) {
      const response = this.emergentCircumstancesFormservice.saveEmergentCircunstancesForm(form);
      response.then(data => {
        data = data.body;
        this.closePopup();
        console.log(data);
      });
    }
  }
}
