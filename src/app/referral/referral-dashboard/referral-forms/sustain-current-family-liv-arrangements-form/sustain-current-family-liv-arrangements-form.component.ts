import { SustainCurrentFamilyLiveArrangementsFormService } from './../../../../core/services/referral/referral-intake/sustain-current-family-live-arrangements-form.service';
import { SustainCurrentFamilyLiveArrangementsForm } from './../../../../_shared/model/Forms/SustainCurrentFamilyLiveArrangementsForm';
import { ɵNullViewportScroller } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidation from '../../../../_shared/constants/validation.constants';
import { CustomvalidationService } from '../../../../_shared/utility/customvalidation.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sustain-current-family-liv-arrangements-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './sustain-current-family-liv-arrangements-form.component.html',
  styleUrls: ['./sustain-current-family-liv-arrangements-form.component.scss']
})
export class SustainCurrentFamilyLivArrangementsFormComponent implements OnInit {
  susCurrFamLivArrForm: FormGroup;
  submitted = false;
  customValidation = customValidation;
  reqPageId: string;
  signDate: string;

  constructor(private fb: FormBuilder,
              private customValidator: CustomvalidationService,
              private sustainCurrentFamilyLiveArrangementsFormService: SustainCurrentFamilyLiveArrangementsFormService,
              public dialogRef: MatDialogRef<SustainCurrentFamilyLivArrangementsFormComponent>) { }

  ngOnInit(): void {
    this.susCurrFamLivArrForm = this.fb.group({
      naturalFamPrsonSw: ['', [Validators.required]],
      prsnUrgntSuppSw: ['', [Validators.required]],
      medBehNeedsStruggSw: ['', [Validators.required]],
      primCarWillngSuppSw: ['', [Validators.required]],

      antiChngsExpTimeTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      currHlthCondnTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      howPrsnIsSuppTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      evntsFamStruggTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      rsnCurrFamArrangTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      othrSuppResAvalTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      optDidNotWorkTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      prsnDsntQualifyTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      trtmntThrpyRcvdTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],

      legalDocumentsSw: [null],
      adaptBehLsaResSw: [null],
      physClinicalNoteSw: [null],
      verifTrgtPopulnSw: [null],
      otherSw: [ɵNullViewportScroller],
      otherDesc: [''],
      electronicSignature: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(65)]]
        });
  }

  getFormData() {
    return this.susCurrFamLivArrForm.controls;
  }

  closePopup(){
    this.dialogRef.close();
   }

  onDocumentCheck(event){

  }

  onOtherDocumentsCheck(event){
    if (event.checked) {
      this.getFormData().otherDesc.setValidators([Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]);
      this.getFormData().otherDesc.updateValueAndValidity();
    }
    else{
      this.getFormData().otherDesc.clearValidators();
      this.getFormData().otherDesc.updateValueAndValidity();
    }
   }

   onSubmit(){
    this.submitted = true;
    this.reqPageId = 'PRILAP';
    const today = new Date();
    this.signDate = today.toJSON();
    const sustainCurrentFamilyLiveArrangementsForm = new SustainCurrentFamilyLiveArrangementsForm(
         null,
         '1',
         this.signDate,
         this.getFormData().naturalFamPrsonSw.value,
         this.getFormData().prsnUrgntSuppSw.value,
         this.getFormData().medBehNeedsStruggSw.value,
         this.getFormData().primCarWillngSuppSw.value,

         this.getFormData().antiChngsExpTimeTxt.value,
         this.getFormData().currHlthCondnTxt.value,
         this.getFormData().howPrsnIsSuppTxt.value,
         this.getFormData().evntsFamStruggTxt.value,
         this.getFormData().rsnCurrFamArrangTxt.value,
         this.getFormData().othrSuppResAvalTxt.value,
         this.getFormData().optDidNotWorkTxt.value,
         this.getFormData().prsnDsntQualifyTxt.value,
         this.getFormData().trtmntThrpyRcvdTxt.value,

         this.sendingYesorNo(this.getFormData().legalDocumentsSw.value),
         this.sendingYesorNo(this.getFormData().adaptBehLsaResSw.value),
         this.sendingYesorNo(this.getFormData().physClinicalNoteSw.value),
         this.sendingYesorNo(this.getFormData().verifTrgtPopulnSw.value),
         this.sendingYesorNo(this.getFormData().otherSw.value),
         this.getFormData().otherDesc.value,
         this.reqPageId,
         this.getFormData().electronicSignature.value
         );
    console.log(this.susCurrFamLivArrForm);
    if (this.susCurrFamLivArrForm.valid){
      this.saveForm(sustainCurrentFamilyLiveArrangementsForm);
    }

  }

  sendingYesorNo(input: boolean) {
    if (input === true) {
      return 'Y';
    } else if (input === false) {
      return 'N';
    }
    else{
      return null;
    }
  }

  saveForm(form){
    const data = '';
    if (this.susCurrFamLivArrForm.valid && this.submitted) {
        const response = this.sustainCurrentFamilyLiveArrangementsFormService.saveSustainCurrentFamilyLiveArrangementsForm(form);
        response.then(data => {
          data = data.body;
          this.closePopup();
          console.log(data);
        });
     }
  }

}
