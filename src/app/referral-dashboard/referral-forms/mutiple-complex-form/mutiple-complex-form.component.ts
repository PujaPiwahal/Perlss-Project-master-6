import { MultipleComplexFormService } from './../../../core/services/referral/referral-intake/multiple-complex-form.service';
import { MultipleComplexForm } from './../../../_shared/model/Forms/MultipleComplexForm';
import { ɵNullViewportScroller } from '@angular/common';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidation from '../../../_shared/constants/validation.constants';
import { CustomvalidationService } from '../../../_shared/utility/customvalidation.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-mutiple-complex-form',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './mutiple-complex-form.component.html',
  styleUrls: ['./mutiple-complex-form.component.scss']
})
export class MutipleComplexFormComponent implements OnInit {
  multipleComplexEfillForm: FormGroup;
  submitted = false;
  customValidation = customValidation;
  reqPageId: string;

  constructor(private fb: FormBuilder,
              private customValidator: CustomvalidationService,
              private multipleComplexFormService: MultipleComplexFormService,
              public dialogRef: MatDialogRef<MutipleComplexFormComponent>) { }

  ngOnInit(): void {
    this.multipleComplexEfillForm = this.fb.group({
      complxChrHlthCondSw: ['', [Validators.required]],
      condExpctdContSw: ['', [Validators.required]],
      hlthSignifiBarEmpSw: ['', [Validators.required]],
      urgentNeedOfSuppSw: ['', [Validators.required]],

      antiChngsExpTimeTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      cmpxHlthCondDiagTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      hlthCndBarEmpTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      hlthCndDlyLifeTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      intAssesObsrvTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      othrSuppResTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      perNeedAddSupTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      prsnSuppTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      optDidNotWorkTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      qualEnrolPriCatTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],
      treatRcvdHlthCndTxt: ['', [Validators.required, this.customValidator.nameValidator(), Validators.maxLength(2000)]],

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
    return this.multipleComplexEfillForm.controls;
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
     this.reqPageId = 'PRIOMP';
     const multipleComplexForm = new MultipleComplexForm(
          null,
          '1',
          this.getFormData().complxChrHlthCondSw.value,
          this.getFormData().condExpctdContSw.value,
          this.getFormData().hlthSignifiBarEmpSw.value,
          this.getFormData().urgentNeedOfSuppSw.value,

          this.getFormData().antiChngsExpTimeTxt.value,
          this.getFormData().cmpxHlthCondDiagTxt.value,
          this.getFormData().hlthCndBarEmpTxt.value,
          this.getFormData().hlthCndDlyLifeTxt.value,
          this.getFormData().intAssesObsrvTxt.value,
          this.getFormData().othrSuppResTxt.value,
          this.getFormData().perNeedAddSupTxt.value,
          this.getFormData().prsnSuppTxt.value,
          this.getFormData().optDidNotWorkTxt.value,
          this.getFormData().qualEnrolPriCatTxt.value,
          this.getFormData().treatRcvdHlthCndTxt.value,

          this.sendingYesorNo(this.getFormData().legalDocumentsSw.value),
          this.sendingYesorNo(this.getFormData().mediDocumentationSw.value),
          this.sendingYesorNo(this.getFormData().adaptBehLsaResSw.value),
          this.sendingYesorNo(this.getFormData().physClinicalNoteSw.value),
          this.sendingYesorNo(this.getFormData().verifTrgtPopulatinSw.value),
          this.sendingYesorNo(this.getFormData().otherSw.value),
          this.getFormData().otherDesc.value,
          this.reqPageId,
          this.getFormData().electronicSignature.value
          );
     console.log(multipleComplexForm);
     if (this.multipleComplexEfillForm.valid){
       this.saveForm(multipleComplexForm);
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
    if (this.multipleComplexEfillForm.valid && this.submitted) {
        const response = this.multipleComplexFormService.saveMultipleComplexForm(form);
        response.then(data => {
          data = data.body;
          this.closePopup();
          console.log(data);
        });
     }
  }
}
