import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidation from '../../../../_shared/constants/validation.constants';
import { CustomvalidationService } from '../../../../_shared/utility/customvalidation.service';
import { ɵNullViewportScroller } from '@angular/common';
import { EmergentCircumstancesFormservice } from './../../../../core/services/referral/referral-intake/Emergent-Circumstances-Form.service';

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
      complxChrHlthCondSw: ['', [Validators.required]],
      condExpctdContSw: ['', [Validators.required]],
      hlthSignifiBarEmpSw: ['', [Validators.required]],
      urgentNeedOfSuppSw: ['', [Validators.required]],
      condExpctdTwentyOne: ['', [Validators.required]],
      condExpctdHealthSafety: ['', [Validators.required]],
      condAdultTransition: ['', [Validators.required]],
      condServiceSupport: ['', [Validators.required]],
      qualEnrolPriCatTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      cmpxHlthCondDiagTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      treatRcvdHlthCndTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      hlthCndDlyLifeTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      hlthCndBarEmpTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      optDidNotWorkTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      prsnSuppTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      antiChngsExpTimeTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      perNeedAddSupTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      othrSuppResTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      intAssesObsrvTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],

      legalDocumentsSw: [null],
      mediDocumentationSw: [null],
      adaptBehLsaResSw: [null],
      physClinicalNoteSw: [null],
      verifTrgtPopulatinSw: [null],
      otherSw: [ɵNullViewportScroller],
      otherDesc: [''],
      electronicSignature: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(65)]]
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
      console.log("before on submit function", this.emergentCircumstancesReviewForm.valid);
      this.submitted = true;
      if(this.emergentCircumstancesReviewForm.valid) {
        const response = await this.emergentCircumstancesFormservice.saveEmergentCircunstancesForm({
          ...this.emergentCircumstancesReviewForm.value,
          mediDocumentationSw: 'Y',
          legalDocumentsSw: this.sendingYesorNo(this.getFormData().legalDocumentsSw.value),
          adaptBehLsaResSw: this.sendingYesorNo(this.getFormData().adaptBehLsaResSw.value),
          physClinicalNoteSw: this.sendingYesorNo(this.getFormData().physClinicalNoteSw.value),
          verifTrgtPopulatinSw: this.sendingYesorNo(this.getFormData().verifTrgtPopulatinSw.value),
        });
        console.log("inside on submit function");
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
