import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ReferenceTable} from '../../_shared/utility/ReferenceTables';

@Component({
  selector: 'app-enrollment-details',
  templateUrl: './enrollment-details.component.html',
  styleUrls: ['./enrollment-details.component.scss']
})
export class EnrollmentDetailsComponent implements OnInit {
  myForm: FormGroup;
  displayedChoicesGroupTble: string[] = ['Description', 'Group', 'Amount', 'Effective Date', 'End Date', 'User Actions'];
  choicesGroupDataSource = CHOICES_GROUP_DATA;
    authorizationStatusRT: ReferenceTable[] = [
    {code: 'NE', description: 'Approved'},
    {code: 'IN', description: 'In Progress'},
    {code: 'DN', description: 'Denied'},
    {code: 'CO', description: 'Complete'}
  ];
medicaidEligibilityRt: ReferenceTable[] = [
    {code: 'NE', description: 'Approved'},
    {code: 'IN', description: 'In Progress'},
    {code: 'DN', description: 'Denied'},
    {code: 'CO', description: 'Complete'}
  ];
  isFinancialEligibilityDropDownToggled = false;
  isEnrollmentDetailsDropDownToggled = false;
  constructor(private fb: FormBuilder ) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      patientLibltyAmnt: ['']
    });
  }

  onClickCheckFinancialElgbltyBtn($event) {

  }

  onViewPatientLiabilityDetails($event) {

  }

  toggleDropDown(dropDown) {
    if (dropDown === 'financialEligibilityCriteria') {
      this.isFinancialEligibilityDropDownToggled = !this.isFinancialEligibilityDropDownToggled;
    } else if (dropDown === 'enrollmentDetailsDropDown') {
      this.isEnrollmentDetailsDropDownToggled = !this.isEnrollmentDetailsDropDownToggled;
    }
  }

}

export interface ChoicesGroup {
  description: string;
  group: string;
  amount: number;
  effectiveDate: string;
  effectiveEndDate: string;
  userAction: string;
}

const CHOICES_GROUP_DATA: ChoicesGroup[] = [
  {description: 'Choices Group 2', group: 'Base', amount: 1230,
    effectiveDate: '2/3/2020', effectiveEndDate: '4/6/2021', userAction: 'Edit'},
  {description: 'Choices Group 2', group: 'Base', amount: 1230, effectiveDate: '2/3/2020',
    effectiveEndDate: '4/6/2021', userAction: 'Edit'},
  {description: 'Choices Group 2', group: 'Base', amount: 1230, effectiveDate: '2/3/2020',
    effectiveEndDate: '4/6/2021', userAction: 'Edit'},
  {description: 'Choices Group 2', group: 'Base', amount: 1230, effectiveDate: '2/3/2020',
    effectiveEndDate: '4/6/2021', userAction: 'Edit'},
  {description: 'Choices Group 2', group: 'Base', amount: 1230, effectiveDate: '2/3/2020',
    effectiveEndDate: '4/6/2021', userAction: 'Edit'},
  {description: 'Choices Group 2', group: 'Base', amount: 1230, effectiveDate: '2/3/2020',
    effectiveEndDate: '4/6/2021', userAction: 'Edit'}
];

