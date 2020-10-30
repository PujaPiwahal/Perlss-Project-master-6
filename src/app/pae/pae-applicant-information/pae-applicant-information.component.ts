import { CustomvalidationService } from './../../_shared/utility/customvalidation.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as customValidation from '../../_shared/constants/validation.constants';
import { MatRadioChange } from '@angular/material/radio';
import { HttpResponse } from '@angular/common/http';
import { Applicant } from '../../_shared/model/Applicant';
import { ApplicantAddress } from '../../_shared/model/ApplicantAddress';


@Component({
  selector: 'app-pae-applicant-information',
  templateUrl: './pae-applicant-information.component.html',
  styleUrls: ['./pae-applicant-information.component.scss']
})
export class PaeApplicantInformationComponent implements OnInit {
  applicantComponentComplete = false;
  applicantComponentStep = false;
  isSearchPerson = false;
  birthdayDateString: string;
  myForm: FormGroup;
  customValidation = customValidation;
  minDate: Date;
  maxDate: Date;
  paeApplicantForm: FormGroup;
  age: number;
  paeApplicantDetail: object;
  alternateNameSW = false;
  mailAddrSW = true;
  addrFormatSW = false;
  mailAddrFormatSW = false;
  today: Date;

  constructor(private fb: FormBuilder,
              private customValidator: CustomvalidationService) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 119, 0, 1);
    this.maxDate = new Date();
    this.paeApplicantForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(45), this.customValidator.nameValidator()]],
      lastName: ['', [Validators.required, Validators.maxLength(45), this.customValidator.nameValidator()]],
      midInitial: ['', [Validators.maxLength(1), Validators.pattern('^[a-zA-Z]*$')]],
      birthDt: ['', [Validators.required]],
      suffix: [''],
      genderCd: [''],
      ssn: ['', [Validators.required, this.customValidator.ssnValidator()]],
      aliasFirstName: ['', [Validators.required, Validators.maxLength(45), this.customValidator.nameValidator()]],
      aliasLastName: ['', [Validators.required, Validators.maxLength(45), this.customValidator.nameValidator()]],
      aliasMidInitial: ['', [Validators.maxLength(1), Validators.pattern('^[a-zA-Z]*$')]],
      ssnAvailableSw: [''],
      altNameSw: [''],
      addressFormatCd: [''],
      aliasSuffix: [''],
      addrLine1: ['', [Validators.required, Validators.maxLength(100), this.customValidator.addressAndCityValidator()]],
      addrLine2: ['', [Validators.maxLength(50), this.customValidator.addressAndCityValidator()]],
      stateCd: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.maxLength(25), this.customValidator.addressAndCityValidator()]],
      zipcode: ['', [Validators.required, Validators.pattern('[0-9]{5}') , this.customValidator.specialCharacterValidator()]],
      zipExt: ['', Validators.pattern('[0-9]') ],
      cntyCd: ['', [Validators.required]],
      apoFpoCd: [''],
      aaAeApCd: [''],
      mailAddrSw: [''],
      mailAddressFormatCd: [null],
      mailAddrLine1: [null],
      mailAddrLine2: [null],
      mailCity: [null],
      mailState: [null],
      mailZip: [null],
      mailZipExtn: [null],
      mailCounty: [null]
    });
  }


  calculateAge(event) {
    this.today = new Date();
    console.log(JSON.stringify(this.today.toJSON()));
    const birthDate = new Date(event.value);
    this.birthdayDateString = birthDate.toJSON();
    let age = this.today.getFullYear() - birthDate.getFullYear();
    const m = this.today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && this.today.getDate() < birthDate.getDate())) {
      age--;
    }
    this.age = age;
  }
  get getFormData() {
    return this.paeApplicantForm.controls;
  }
  savePaeApplicant() {
    //TODO Save applicant
  }

  searchPerson() {
    this.isSearchPerson = true;
    console.log(this.isSearchPerson);
  }

  onAlternateNameChange(mrChange: MatRadioChange) {
    if (mrChange.value === 'N') {
      this.alternateNameSW = false;
      this.getFormData.aliasFirstName.clearValidators();
      this.getFormData.aliasMidInitial.clearValidators();
      this.getFormData.aliasLastName.clearValidators();
      this.getFormData.aliasFirstName.updateValueAndValidity();
      this.getFormData.aliasMidInitial.updateValueAndValidity();
      this.getFormData.aliasLastName.updateValueAndValidity();
    }
    else if (mrChange.value === 'Y') {
      this.alternateNameSW = true;
      this.getFormData.aliasFirstName.setValidators([Validators.required,
        Validators.maxLength(45), this.customValidator.nameValidator()]);
      this.getFormData.aliasMidInitial.setValidators([Validators.maxLength(1), Validators.pattern('^[a-zA-Z]*$')]);
      this.getFormData.aliasLastName.setValidators([Validators.required, Validators.maxLength(45), this.customValidator.nameValidator()]);
      this.getFormData.aliasFirstName.updateValueAndValidity();
      this.getFormData.aliasMidInitial.updateValueAndValidity();
      this.getFormData.aliasLastName.updateValueAndValidity();
    }
  }

  onMailAddrChange(mrChange: MatRadioChange) {
    if (mrChange.value === 'N') {
      this.mailAddrSW = false;
    }
    else if (mrChange.value === 'Y') {
      this.mailAddrSW = true;
    }
  }
  onMailAddressFormat(event) {
    if (event.target.value === 'MLTY') {
      this.mailAddrFormatSW = true;
    } else {
      this.mailAddrFormatSW = false;
    }

  }
  onAddressFormat(event) {
    if (event.target.value === 'MLTY') {
      this.addrFormatSW = true;
    } else {
      this.addrFormatSW = false;
    }
  }

  back() {
    const previousForm = 'PRSTRF';
  }
}
