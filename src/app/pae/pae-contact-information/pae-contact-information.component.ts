import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogConfig } from '@angular/material/dialog/dialog-config';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { SavePopupComponent } from 'src/app/savePopup/savePopup.component';
import { CustomvalidationService } from 'src/app/_shared/utility/customvalidation.service';
import * as customValidation from '../../_shared/constants/validation.constants';
import { PeaContactInformation } from '../../_shared/model/PeaContactInformation';

@Component({
  selector: 'app-pae-contact-information',
  templateUrl: './pae-contact-information.component.html',
  styleUrls: ['./pae-contact-information.component.scss']
})

export class PaeContactInformationComponent implements OnInit {
  dialog: any;
  constructor(private fb: FormBuilder, private customValidator: CustomvalidationService) { }
  get f() {
    return this.myForm.controls;
  }
  customValidation = customValidation;
  myForm: FormGroup;
  isDesignee = true;
  event: string;
  submitted: boolean;
  refContactForm: any;

  getFormData(): any {
    throw new Error('Method not implemented.');
  }
  saveRefandContact() {
    throw new Error('Method not implemented.');
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      emailAddress: ['', [Validators.required, this.customValidator.emailValidator()]],
      cellPhone: [''],
      homePhone: [''],
      workPhone: [''],
      prefPhoneTypCd: ['', [Validators.required]],
      designeeFirstName: ['', [Validators.required]],
      designeeMiddleName: [''],
      designeeLastName: ['', [Validators.required]],
      designeeRelationship: ['', [Validators.required]],
      childRecordRights: [''],
      language: ['', [Validators.required]]
    });
  }

  saveContactInformation() {
  }

 /*  saveAndExit() {
    if (this.saveContactInformation()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { route: 'dashboard/pae' };
      dialogConfig.panelClass = 'exp_popup';
      dialogConfig.width = '500px';
      this.dialog.open(SavePopupComponent, dialogConfig );
    }
  } */

  next(){
    this.event = 'Next';
    this.submitted = true;
    if (this.myForm.valid) {
        this.saveContactInformation();
        alert('submitted peacontact form');
      }
    }

  onPhoneTypeChange(value: string) {
   const cellPhNum = this.myForm.get('cellPhone');
   const workPhNum = this.myForm.get('workPhone');
   const homePhNum = this.myForm.get('homePhone');
   if (value === 'cellPhone') {
      cellPhNum.setValidators([
        Validators.required,
        Validators.maxLength(10),
        this.customValidator.phonenumberValidator(),
      ]);
      homePhNum.clearValidators();
      workPhNum.clearValidators();
    } else if (value === 'homePhone') {
      cellPhNum.clearValidators();
      workPhNum.clearValidators();
      homePhNum.setValidators([
        Validators.required,
        Validators.maxLength(10),
        this.customValidator.phonenumberValidator(),
      ]);
    } else if (value === 'workPhone') {
      cellPhNum.clearValidators();
      homePhNum.clearValidators();
      workPhNum.setValidators([
        Validators.required,
        Validators.maxLength(10),
        this.customValidator.phonenumberValidator(),
      ]);
    }
   cellPhNum.updateValueAndValidity();
   workPhNum.updateValueAndValidity();
   homePhNum.updateValueAndValidity();
  }

      onChange(mrChange: MatRadioChange) {
    if (mrChange.value === 'no') {
      this.isDesignee = false;
      this.myForm.get('designeeFirstName').clearValidators();
      this.myForm.get('designeeLastName').clearValidators();
      this.myForm.get('designeeRelationship').clearValidators();
      this.myForm.get('language').clearValidators();
    }
    else if (mrChange.value === 'yes') {
      this.isDesignee = true;
      this.myForm.get('designeeFirstName').setValidators(Validators.required);
      this.myForm.get('designeeLastName').setValidators(Validators.required);
      this.myForm.get('designeeRelationship').setValidators(Validators.required);
      this.myForm.get('language').setValidators(Validators.required);
    }
    this.myForm.get('designeeFirstName').updateValueAndValidity();
    this.myForm.get('designeeLastName').updateValueAndValidity();
    this.myForm.get('designeeRelationship').updateValueAndValidity();
    this.myForm.get('language').updateValueAndValidity();
 }

}
