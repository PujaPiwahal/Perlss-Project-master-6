import { CustomvalidationService } from '../../_shared/utility/customvalidation.service';
import { MatTableDataSource } from '@angular/material/table';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RefApplicantDetail } from '../../_shared/model/RefApplicantDetail';
import { RefCoreDtl } from '../../_shared/model/RefCoreDtl';
import { Applicant } from '../../_shared/model/Applicant';
import { ApplicantAddress } from '../../_shared/model/ApplicantAddress';
import { ReferralFlowSeq } from '../../_shared/utility/ReferralFlowSeq';
import { SearchPerson } from '../../_shared/model/SearchPerson';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReferralService } from '../../core/services/referral/referral.service';
import { MatRadioChange } from '@angular/material/radio';
import { HttpResponse } from '@angular/common/http';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as customValidation from '../../_shared/constants/validation.constants';
import { ExternalreferralService } from '../services/externalreferral.service';

export interface ReferralSearchElements {
  id: number;
  firstName: string;
  aliasName: string;
  ssn: string;
  paeId: string;
  personID: string;
  physicalAddress: string;
  mailingAddress:string;
  county: string;
  birthDate: any;
  personId : number;
  receivedInQueue: any;
  paeSubmissionDate: any;
  taskStatus: string;
  queueName: string;
  assignedUser: string;
}

@Component({
  selector: 'app-extref-applicant-information',
  templateUrl: './extref-applicant-information.component.html',
  styleUrls: ['./extref-applicant-information.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ExtrefApplicantInformationComponent implements OnInit {
  @Output() completedApplicant: EventEmitter<any> = new EventEmitter<any>();
  applicantComponentComplete = false;
  applicantComponentStep = false;
  isSearchPerson = false;
  birthdayDateString: string;
  myForm: FormGroup;
  customValidation = customValidation;
  minDate: Date;
  maxDate: Date;
  refSearchPerson: string[] = ['personName', 'ssn', 'birthDate', 'personID',
  'county'];
  dataSource: MatTableDataSource<any>;
  expandedElement: ReferralSearchElements | null;
  submissionDate: string;
  
  constructor(
    private fb: FormBuilder, 
    private refService: ReferralService, 
    private customValidator: CustomvalidationService,
    private extRefService: ExternalreferralService) { }

  refApplicantForm: FormGroup;
  age: number;
  refApplicantDetail: RefApplicantDetail;
  searchPerson: SearchPerson;
  alternateNameSW = false;
  mailAddrSW = true;
  addrFormatSW = false;
  mailAddrFormatSW = false;
  today: Date;
  submitted = false;

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 119, 0, 1);
    this.maxDate = new Date();
    this.refApplicantForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(45), this.customValidator.nameValidator()]],
      lastName: ['', [Validators.required, Validators.maxLength(45), this.customValidator.nameValidator()]],
      midInitial: ['', [Validators.maxLength(1), Validators.pattern('^[a-zA-Z]*$')]],
      dobDt: ['', [Validators.required]],
      suffix: [''],
      genderCd: ['', [Validators.required]],
      ssn: ['', [Validators.required, this.customValidator.ssnValidator()]],
      aliasFirstName: ['', [Validators.required, Validators.maxLength(45)]],
      aliasLastName: ['', [Validators.required, Validators.maxLength(45)]],
      aliasMidInitial: ['', [Validators.maxLength(1), Validators.pattern('^[a-zA-Z]*$')]],
      ssnAvailableSw: [''],
      altNameSw: ['', [Validators.required]],
      areBothAddrSame: ['', [Validators.required]],
      addressFormatCd: [''],
      aliasSuffix: [''],
      addressLine1: ['', [Validators.required, Validators.maxLength(100), this.customValidator.addressAndCityValidator()]],
      addressLine2: ['', [Validators.maxLength(50), this.customValidator.addressAndCityValidator()]],
      stateCd: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.maxLength(25), this.customValidator.addressAndCityValidator()]],
      zipcode: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
      zipExt: ['', Validators.pattern('[0-9]') ],
      countyCd: ['', [Validators.required]],
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


    this.extRefService.stepReady(this.refApplicantForm,"two");
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
    this.refService.setAge(age);
  }
  getFormData() {
    return this.refApplicantForm.controls;
  }

  saveRefandApplicant() {
    this.submitted = true;
    let nextForm = 'PRCIFO';
    let nextPath = '';
    let that=this;
      if (this.refApplicantForm.valid) {
        this.completedApplicant.emit(ReferralFlowSeq[nextForm]);
       }
  }

  searchForPerson() {
    this.isSearchPerson = true;
    const searchPersonObject = new SearchPerson(
      this.getFormData().firstName.value,
      this.getFormData().lastName.value,
      this.getFormData().ssn.value,
      this.birthdayDateString,
      this.getFormData().midInitial.value,
      this.getFormData().suffix.value,
      this.getFormData().genderCd.value,
    );
    this.refService.getSearchPerson(searchPersonObject).subscribe(
      res => {
        this.dataSource = new MatTableDataSource(res);
      });
  }

  onAlternateNameChange(mrChange: MatRadioChange) {
    if (mrChange.value === 'N') {
      this.alternateNameSW = false;
      this.getFormData().aliasFirstName.clearValidators();
      this.getFormData().aliasMidInitial.clearValidators();
      this.getFormData().aliasLastName.clearValidators();
      this.getFormData().aliasFirstName.updateValueAndValidity();
      this.getFormData().aliasMidInitial.updateValueAndValidity();
      this.getFormData().aliasLastName.updateValueAndValidity();
    }
    else if (mrChange.value === 'Y') {
      this.alternateNameSW = true;
      this.getFormData().aliasFirstName.setValidators([Validators.required,
        Validators.maxLength(45), this.customValidator.nameValidator()]);
      this.getFormData().aliasMidInitial.setValidators([Validators.maxLength(1), Validators.pattern('^[a-zA-Z]*$')]);
      this.getFormData().aliasLastName.setValidators([Validators.required, Validators.maxLength(45), this.customValidator.nameValidator()]);
      this.getFormData().aliasFirstName.updateValueAndValidity();
      this.getFormData().aliasMidInitial.updateValueAndValidity();
      this.getFormData().aliasLastName.updateValueAndValidity();
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
    this.completedApplicant.emit(ReferralFlowSeq[previousForm]);
  }

}
