import { CustomvalidationService } from '../_shared/utility/customvalidation.service';
import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { RefApplicantDetail } from '../_shared/model/RefApplicantDetail';
import { RefCoreDtl } from '../_shared/model/RefCoreDtl';
import { Applicant } from '../_shared/model/Applicant';
import { ApplicantAddress } from '../_shared/model/ApplicantAddress';
import { ReferralFlowSeq } from '../_shared/utility/ReferralFlowSeq';
import { SearchPerson } from '../_shared/model/SearchPerson';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReferralService } from '../core/services/referral/referral.service';
import { MatRadioChange } from '@angular/material/radio';
import { HttpResponse } from '@angular/common/http';
import {animate, state, style, transition, trigger} from '@angular/animations';
import * as customValidation from '../_shared/constants/validation.constants';

export interface ReferralSearchElements {
  id: number,
  personName: string;
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

const ELEMENT_DATA: ReferralSearchElements[] = [
  {
    id: 1,
    personName : "Jessica Jones",
    aliasName: "Jessica Morris",
    ssn : "235-24-1414",
    paeId : "PAE3583582",
    personID : "1234567",
    physicalAddress: "200 Brooks Ave, Nashville TN 37201",
    mailingAddress: "333 Commerce St., Suite 10, Nashville TN 37201",
    county : "Knox",
    birthDate : "05/12/2009",
    personId : 352362626,
    receivedInQueue : "05/19/2020",
    paeSubmissionDate : "05/19/2020",
    taskStatus : "New",
    queueName : "ADJ: Complete New Adjudication - ECF",
    assignedUser : "Admin"
  },
  {
    id: 1,
    personName : "John Smith",
    aliasName: "John Wayne",
    ssn : "1231231231",
    paeId : "PAE123456",
    personID : "8907894",
    physicalAddress: "300 Brooks Ave, Nashville TN 37201",
    mailingAddress: "333 Commerce St., Suite 11, Nashville TN 37201",
    county : "Anderson",
    birthDate : "1989/10/02",
    personId : 1231231,
    receivedInQueue : "Queue Name",
    paeSubmissionDate : "2020/08/01",
    taskStatus : "TaskStatus",
    queueName : "QueueName",
    assignedUser : "Admin"
  }
];

@Component({
  selector: 'app-ref-applicant',
  templateUrl: './ref-applicant.component.html',
  styleUrls: ['./ref-applicant.component.scss'],
  // providers: [ReferralService]
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RefApplicantComponent implements OnInit {

  @Output() completedApplicant: EventEmitter<any> = new EventEmitter<any>();
  applicantComponentComplete = false;
  applicantComponentStep = false;
  isSearchPerson = false;
  birthdayDateString: string;
  myForm: FormGroup;
  customValidation = customValidation;
  minDate: Date;
  maxDate: Date;
  adjudicationSearchRes: string[] = ['personName', 'ssn', 'birthDate', 'personID',
  'county'];
  dataSource2 = ELEMENT_DATA;

  expandedElement: ReferralSearchElements | null;
  submissionDate: string;

  constructor(private fb: FormBuilder, private refService: ReferralService, private customValidator: CustomvalidationService) { }
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
      birthDt: ['', [Validators.required]],
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
      addrLine1: ['', [Validators.required, Validators.maxLength(100), this.customValidator.addressAndCityValidator()]],
      addrLine2: ['', [Validators.maxLength(50), this.customValidator.addressAndCityValidator()]],
      stateCd: ['', [Validators.required]],
      city: ['', [Validators.required, Validators.maxLength(25), this.customValidator.addressAndCityValidator()]],
      zipcode: ['', [Validators.required, Validators.pattern('[0-9]{5}')]],
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
    this.refService.setAge(age);
  }
  getFormData() {
    return this.refApplicantForm.controls;
  }

  saveRefandApplicant() {
    const addressVO = new ApplicantAddress(
      this.getFormData().addressFormatCd.value,
      this.getFormData().addrLine1.value,
      this.getFormData().addrLine2.value,
      'PA',
      this.getFormData().city.value,
      this.getFormData().cntyCd.value,
      this.getFormData().mailAddrLine1.value,
      this.getFormData().mailAddrLine2.value,
      null,
      this.getFormData().mailAddrSw.value,
      this.getFormData().mailCity.value,
      this.getFormData().mailCounty.value,
      this.getFormData().mailState.value,
      null,
      this.getFormData().mailZip.value,
      this.getFormData().mailZipExtn.value,
      null,
      null,
      '0',
      'PRAIFR',
      this.getFormData().stateCd.value,
      null,
      this.getFormData().zipExt.value,
      this.getFormData().zipcode.value
      );

    const applicant = new Applicant(
      null,
      '0',
      this.getFormData().aliasFirstName.value,
      this.getFormData().aliasLastName.value,
      this.getFormData().aliasMidInitial.value,
      this.getFormData().aliasSuffix.value,
      this.getFormData().altNameSw.value,
      this.birthdayDateString,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      this.getFormData().firstName.value, this.getFormData().genderCd.value,
      null,
      null,
      null,
      this.getFormData().lastName.value, this.getFormData().midInitial.value,
      this.getFormData().ssn.value, this.getFormData().ssnAvailableSw.value,
      null,
      true,
      'PRAIFR',
      addressVO);

    if(this.today)  {
      this.submissionDate = this.today.toJSON();
    }

    this.refApplicantDetail = this.refService.getRefApplicantDetail();

    const refCoreDtl = new RefCoreDtl(
      'PRAIFR',
      '0',
      null,
      '0',
      'Test',
      'Test',
      'N',
      'N',
      '0',
      'ECF',
      'OTHR',
      'PCF',
      this.submissionDate,
      this.submissionDate,
      'ps',
      this.refApplicantDetail,
      applicant
      );
    console.log(this.refApplicantForm);
    this.submitted = true;
    const response = this.refService.saveReferral(refCoreDtl);
    let nextForm = 'PRCIFO';
    let nextPath = '';
    response.then(function(response: HttpResponse<any>) {
      nextForm = response.headers.get('next');
      response = response.body;
      nextPath = ReferralFlowSeq[nextForm];
      this.completedApplicant.emit(ReferralFlowSeq[nextForm]);
    });
  }

  searchForPerson() {
    this.isSearchPerson = true;
    console.log(this.isSearchPerson);
    const searchPersonObject = new SearchPerson(
      this.getFormData().firstName.value,
      this.getFormData().lastName.value,
      this.getFormData().ssn.value,
      this.birthdayDateString,
      this.getFormData().midInitial.value,
      this.getFormData().suffix.value,
      this.getFormData().genderCd.value,
    );
    console.log(searchPersonObject);
    // this.refService.getSearchPerson(searchPersonObject).subscribe(
    //   res => {
    //     console.log(res);
    //   });
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
