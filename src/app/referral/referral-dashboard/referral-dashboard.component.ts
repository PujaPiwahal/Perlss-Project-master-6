import { ReferralDashboardService } from './../../core/services/referral/referral-dashboard/referral-dashboard.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as customValidation from '../../_shared/constants/validation.constants';
import { ReferralFilter } from '../../_shared/model/ReferralFilter';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { MatTableDataSource } from '@angular/material/table';
import { MatAccordion } from '@angular/material/expansion';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRecordPopupComponent } from '../../_shared/modal/delete-record-popup/delete-record-popup.component';

@Component({
  selector: 'app-referral-dashboard',
  templateUrl: './referral-dashboard.component.html',
  styleUrls: ['./referral-dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class ReferralDashboardComponent implements OnInit, OnDestroy {
  pendingReferralCount: number;
  customValidation = customValidation;
  futureDues5Days: number;
  pastDuesPendingCount: number;
  totalPendingCount: number;
  subscription1$: Subscription;
  subscription2$: Subscription;
  subscription3$: Subscription;
  subscription4$: Subscription;
  subscription5$: Subscription;
  subscription6$: Subscription;
  subscription7$: Subscription;
  subscriptions: Subscription[] = [];
  alertPastDue = false;
  isSupervisorSwitch = false;
  isMyOpenTasksClicked = false;
  searchReferralClicked = false;
  @ViewChild('accordion', { static: true }) Accordion: MatAccordion;
  ecfStatusList = [
    { name: 'PS', value: 'Pending Submission', activateSW: 'Y' },
    { name: 'NW', value: 'New', activateSW: 'Y' },
    { name: 'IN', value: 'Intake', activateSW: 'Y' },
    { name: 'RR', value: 'Request for Reassignment', activateSW: 'Y' },
    { name: 'NR', value: 'Nurse Review', activateSW: 'Y' },
    { name: 'IA', value: 'IARC Review', activateSW: 'Y' },
    { name: 'IR', value: 'Information Requested', activateSW: 'Y' },
    { name: 'SA', value: 'Pending Slot Assignment', activateSW: 'Y' },
    { name: 'RL', value: 'On Referral List', activateSW: 'Y' },
    { name: 'PE', value: 'Pending PAE', activateSW: 'Y' },
    { name: 'TP', value: 'TP Denied', activateSW: 'Y' },
    { name: 'CP', value: 'Complete', activateSW: 'Y' },
    { name: 'EN', value: 'Ended', activateSW: 'Y' },
    { name: 'UC', value: 'Unable to Contact', activateSW: 'Y' },
    { name: 'IE', value: 'Intake Ended by Applicant Request', activateSW: 'Y' },
    { name: 'RE', value: 'To be Removed from Referral List', activateSW: 'Y' },
    { name: 'CL', value: 'Closed', activateSW: 'Y' },
  ];
  kbStatusList = [
    { name: 'NE', value: 'New', activateSW: 'Y' },
    { name: 'IN', value: 'Intake', activateSW: 'Y' },
    { name: 'PP', value: 'Pending PAE', activateSW: 'Y' },
    { name: 'CO', value: 'Complete', activateSW: 'Y' },
    { name: 'EN', value: 'Ended', activateSW: 'Y' },
    { name: 'OW', value: 'On Waiting List', activateSW: 'Y' },
    { name: 'RE', value: 'To Be Removed from Waiting List', activateSW: 'Y' },
    { name: 'CL', value: 'Closed', activateSW: 'Y' },
  ];
  referralStatusList = [
    { name: 'PS', value: 'Pending Submission', activateSW: 'Y' },
    { name: 'NW', value: 'New', activateSW: 'Y' },
    { name: 'IN', value: 'Intake', activateSW: 'Y' },
    { name: 'RR', value: 'Request for Reassignment', activateSW: 'Y' },
    { name: 'NR', value: 'Nurse Review', activateSW: 'Y' },
    { name: 'IA', value: 'IARC Review', activateSW: 'Y' },
    { name: 'IR', value: 'Information Requested', activateSW: 'Y' },
    { name: 'SA', value: 'Pending Slot Assignment', activateSW: 'Y' },
    { name: 'RL', value: 'On Referral List', activateSW: 'Y' },
    { name: 'PE', value: 'Pending PAE', activateSW: 'Y' },
    { name: 'TP', value: 'TP Denied', activateSW: 'Y' },
    { name: 'CP', value: 'Complete', activateSW: 'Y' },
    { name: 'EN', value: 'Ended', activateSW: 'Y' },
    { name: 'UC', value: 'Unable to Contact', activateSW: 'Y' },
    { name: 'IE', value: 'Intake Ended by Applicant Request', activateSW: 'Y' },
    { name: 'RE', value: 'To be Removed from Referral List', activateSW: 'Y' },
    { name: 'CL', value: 'Closed', activateSW: 'Y' },
  ];
  grandRegionList = [
    { name: 'WR', value: 'West Region', activateSW: 'Y' },
    { name: 'MR', value: 'Middle Region', activateSW: 'Y' },
    { name: 'ER', value: 'East Region', activateSW: 'Y' },
  ];
  taskQueueList = [
    {
      name: 'LRRR',
      value: 'REF: LTSS Referral Reassignment Review',
      activateSW: 'Y',
    },
    {
      name: 'CROA',
      value: 'APL: Correction Required for Onsite Assessment',
      activateSW: 'Y',
    },
    { name: 'ARS', value: 'SLT: Appeallant Requires a Slot', activateSW: 'Y' },
    {
      name: 'RDAN',
      value: 'APL: Review Additional Documents',
      activateSW: 'Y',
    },
    {
      name: 'RDOC',
      value: 'APL: Review Additional Documents',
      activateSW: 'Y',
    },
    {
      name: 'CNHR',
      value: 'APL: Complete a Nurse Hearing Reference Form',
      activateSW: 'Y',
    },
    { name: 'CNOH', value: 'APL: Correct NOH', activateSW: 'Y' },
    { name: 'AP', value: 'APL: Approve PASRR', activateSW: 'Y' },
    { name: 'CS', value: 'APL: Create a Supplemental', activateSW: 'Y' },
    {
      name: 'UIO',
      value: 'REF: Update Intake Outcome Based on Appeal Decision',
      activateSW: 'Y',
    },
    {
      name: 'ADPI',
      value: 'REF: Appeal Decision Process- Intake Outcome',
      activateSW: 'Y',
    },
    { name: 'AOHS', value: 'SLT: Appeal Outcome Hold a Slot', activateSW: 'Y' },
    {
      name: 'UEAO',
      value: 'ENR: Update Enrollment based on Appeal Outcome',
      activateSW: 'Y',
    },
    {
      name: 'COBE',
      value: 'ENR: <MMIS – Assign Benefit COB Error>',
      activateSW: 'Y',
    },
    { name: 'OPUR', value: 'ENR: Override PAE Update Review', activateSW: 'Y' },
    {
      name: 'ROPO',
      value: 'APL: Request Onsite to be Put On-hold',
      activateSW: 'Y',
    },
    { name: 'ARR', value: 'APL: Appeal is Ready for Review', activateSW: 'Y' },
    {
      name: 'RRE',
      value: 'ADJ: Recertification Review - ECF',
      activateSW: 'Y',
    },
    {
      name: 'MABE',
      value: 'ENR: MMIS - Assign Benefit Error',
      activateSW: 'Y',
    },
    { name: 'RI', value: 'ENR: Reinstatement Implementation', activateSW: 'Y' },
    {
      name: 'DICI',
      value: 'ENR: DD to ID Change Implementation',
      activateSW: 'Y',
    },
    { name: 'LCI', value: 'ENR: LON Change Implementation', activateSW: 'Y' },
    {
      name: 'CTEC',
      value: 'ENR: Complete Transition Enrollment - CAC',
      activateSW: 'Y',
    },
    {
      name: 'CTEI',
      value: 'ENR: Complete Transition Enrollment - ICF',
      activateSW: 'Y',
    },
    {
      name: 'CTEP',
      value: 'ENR: Complete Transition Enrollment - PACE',
      activateSW: 'Y',
    },
    {
      name: 'CTE3',
      value: 'ENR: Complete Transition Enrollment - CHOICES Group 3',
      activateSW: 'Y',
    },
    {
      name: 'CTE2',
      value: 'ENR: Complete Transition Enrollment - CHOICES Group 2',
      activateSW: 'Y',
    },
    {
      name: 'CTE1',
      value: 'ENR: Complete Transition Enrollment - CHOICES Group 1',
      activateSW: 'Y',
    },
    {
      name: 'CTEE',
      value: 'ENR: Complete Transition Enrollment - ECF CHOICES',
      activateSW: 'Y',
    },
    { name: 'CSR', value: 'SLT: CEA Slot Review', activateSW: 'Y' },
    { name: 'RC2S', value: 'SLT: Review CHOICES 2 Slot', activateSW: 'Y' },
    { name: 'CCR', value: 'SLT: Caregiver Change Review', activateSW: 'Y' },
    { name: 'RSA', value: 'SLT: Review Slot Assignment', activateSW: 'Y' },
    { name: 'PM', value: 'PER: Person Match', activateSW: 'Y' },
    { name: 'ISPP', value: 'PER: Input SSN for Pending PAE', activateSW: 'Y' },
    { name: 'NECI', value: 'REF: New ECF CHOICES Intake', activateSW: 'Y' },
    {
      name: 'CCEI',
      value: 'ENR: Cost Cap Exception Implementation',
      activateSW: 'Y',
    },
    {
      name: 'TECI',
      value: 'REF: Transition ECF CHOICES Intake',
      activateSW: 'Y',
    },
    {
      name: 'PRKA',
      value: 'PAE: Physician Review for KB Part A',
      activateSW: 'Y',
    },
    { name: 'NRKA', value: 'PAE: Nurse Review for KB Part A', activateSW: 'Y' },
    { name: 'CEAR', value: 'ADJ: Complete CEA Review', activateSW: 'Y' },
    { name: 'SISR', value: 'ADJ: SIS Assessment Review', activateSW: 'Y' },
    {
      name: 'NREC',
      value: 'REF: Nurse Review for ECF CHOICES',
      activateSW: 'Y',
    },
    {
      name: 'EEAE',
      value: 'ENR: ERC Enrollment Additon/Extension',
      activateSW: 'Y',
    },
    { name: 'RNOH', value: 'APL: Review Notice of Hearing', activateSW: 'Y' },
    {
      name: 'UODD',
      value: 'APL: Update order decision details',
      activateSW: 'Y',
    },
    { name: 'ANR', value: 'APL: Appeal Nurse Review', activateSW: 'Y' },
    {
      name: 'RDUM',
      value: 'APL: Review Documents Uploaded by the MCO',
      activateSW: 'Y',
    },
    { name: 'RLSA', value: 'APL: Review the Returned LSA', activateSW: 'Y' },
    {
      name: 'CROA',
      value: 'APL: Complete clinical review of onsite assessment',
      activateSW: 'Y',
    },
    {
      name: 'CNEC',
      value: 'ENR: Complete New Enrollment - CAC',
      activateSW: 'Y',
    },
    { name: 'MCOP', value: 'ENR: <MMIS- MCO_Update – PAE>', activateSW: 'Y' },
    {
      name: 'MCOR',
      value: 'ENR: <MMIS - MCO_Update – at-risk MCO>',
      activateSW: 'Y',
    },
    {
      name: 'MIFE',
      value: 'ENR: <MMIS In-flight Enrollment>',
      activateSW: 'Y',
    },
    { name: 'MCOR', value: 'ENR: Review the MCO', activateSW: 'Y' },
    {
      name: 'CNEI',
      value: 'ENR: Complete New Enrollment - ICF',
      activateSW: 'Y',
    },
    {
      name: 'CNEP',
      value: 'ENR: Complete New Enrollment - PACE',
      activateSW: 'Y',
    },
    {
      name: 'CNE3',
      value: 'ENR: Complete New Enrollment - CHOICES Group 3',
      activateSW: 'Y',
    },
    {
      name: 'CNE2',
      value: 'ENR: Complete New Enrollment - CHOICES Group 2',
      activateSW: 'Y',
    },
    {
      name: 'CNE1',
      value: 'ENR: Complete New Enrollment - CHOICES Group 1',
      activateSW: 'Y',
    },
    {
      name: 'CNEE',
      value: 'ENR: Complete New Enrollment - ECF CHOICES',
      activateSW: 'Y',
    },
    {
      name: 'CDR',
      value: 'ENR: Complete Disenrollment Request',
      activateSW: 'Y',
    },
    {
      name: 'CCC',
      value: 'PAE: Change in caregiver\'s condition',
      activateSW: 'Y',
    },
    { name: 'LONC', value: 'ADJ: LON Change Request', activateSW: 'Y' },
    { name: 'CCER', value: 'ADJ: Cost Cap Exception Review ', activateSW: 'Y' },
    { name: 'RAS', value: 'ADJ: Review Audit Submission', activateSW: 'Y' },
    { name: 'PA', value: 'ADJ: Perform Audit', activateSW: 'Y' },
    { name: 'RSC', value: 'SLT: Resolve Slot Conflict', activateSW: 'Y' },
    {
      name: 'CRDU',
      value: 'GEN: Complete Demographic Update Restricted by Case Status',
      activateSW: 'Y',
    },
    {
      name: 'CSIS',
      value: 'PAE: Complete SIS Assessment Request',
      activateSW: 'Y',
    },
    {
      name: 'AINR',
      value: 'REF: Additional Information Request from Nurse Review',
      activateSW: 'Y',
    },
    {
      name: 'RRWL',
      value: 'SLT: Remove from Referral/Wait List',
      activateSW: 'Y',
    },
    { name: 'SLSA', value: 'APL: Send for LSA', activateSW: 'Y' },
    { name: 'POA', value: 'APL: Perform Onsite Assessment', activateSW: 'Y' },
    {
      name: 'KBSR',
      value: 'PAE: DIDD Part B Supervisor Review Queue',
      activateSW: 'Y',
    },
    {
      name: 'ATC',
      value: 'ADJ: Adjudicate Transition to CAC PAE',
      activateSW: 'Y',
    },
    {
      name: 'ATI',
      value: 'ADJ: Adjudicate Transition to ICF PAE',
      activateSW: 'Y',
    },
    {
      name: 'KBWR',
      value: 'PAE: Review KB Withdrawal Request - DIDD',
      activateSW: 'Y',
    },
    {
      name: 'ATP',
      value: 'ADJ: Adjudicate PACE Transition PAE',
      activateSW: 'Y',
    },
    {
      name: 'ATCH',
      value: 'ADJ: Adjudicate CHOICES HCBS Transition PAE',
      activateSW: 'Y',
    },
    {
      name: 'ATCN',
      value: 'ADJ: Adjudicate CHOICES NF Transition PAE',
      activateSW: 'Y',
    },
    {
      name: 'ATE',
      value: 'ADJ: Adjudicate ECF Transition PAE',
      activateSW: 'Y',
    },
    { name: 'ANC', value: 'ADJ: Adjudicate CAC PAE', activateSW: 'Y' },
    { name: 'ANI', value: 'ADJ: Adjudicate ICF PAE', activateSW: 'Y' },
    { name: 'ANP', value: 'ADJ: Adjudicate PACE PAE', activateSW: 'Y' },
    {
      name: 'ANCH',
      value: 'ADJ: Adjudicate CHOICES HCBS PAE',
      activateSW: 'Y',
    },
    { name: 'ANCN', value: 'ADJ: Adjudicate CHOICES NF PAE', activateSW: 'Y' },
    { name: 'ANE', value: 'ADJ: Adjudicate ECF PAE', activateSW: 'Y' },
    {
      name: 'ERCR',
      value: 'ADJ: ERC Addition/Extension Review ',
      activateSW: 'Y',
    },
    {
      name: 'PRR',
      value: 'ADJ: Recertification Review - PACE',
      activateSW: 'Y',
    },
    {
      name: 'C1RR',
      value: 'ADJ: Recertification Review - CHOICES 1',
      activateSW: 'Y',
    },
    {
      name: 'ACEA',
      value: 'PAE: Add Cost Effective Alternative Interest',
      activateSW: 'Y',
    },
    {
      name: 'CSAR',
      value: 'PAE: Complete Safety Assessment Request',
      activateSW: 'Y',
    },
    { name: 'IARC', value: 'REF: Complete IARC Review ', activateSW: 'Y' },
    {
      name: 'ECFR',
      value: 'PAE: Complete ECF Recertification',
      activateSW: 'Y',
    },
    {
      name: 'ECFW',
      value: 'REF: Review ECF Withdrawal Request',
      activateSW: 'Y',
    },
    { name: 'CPAA', value: 'PAE: Complete Part A Assessment', activateSW: 'Y' },
    {
      name: 'KBTP',
      value: 'PAE: Transition Katie Beckett PAE Needed - DIDD',
      activateSW: 'Y',
    },
    {
      name: 'CPC',
      value: 'PAE: Complete PACE Recertification/Reassessment',
      activateSW: 'Y',
    },
    { name: 'ETP', value: 'PAE: Transition ECF PAE Needed', activateSW: 'Y' },
    {
      name: 'CNTP',
      value: 'PAE: Transition CHOICES NF PAE Needed',
      activateSW: 'Y',
    },
    {
      name: 'AC3I',
      value: 'PAE: Add Group 3 Interest Details ',
      activateSW: 'Y',
    },
    {
      name: 'CHTP',
      value: 'PAE: Transition CHOICES HCBS PAE Needed',
      activateSW: 'Y',
    },
    { name: 'ENP', value: 'PAE: Complete ECF PAE', activateSW: 'Y' },
    { name: 'CTP', value: 'PAE: Transition CAC PAE Needed', activateSW: 'Y' },
    { name: 'ITP', value: 'PAE: Transition ICF PAE Needed', activateSW: 'Y' },
    {
      name: 'KBNP',
      value: 'PAE: New Katie Beckett Referral Received - DIDD',
      activateSW: 'Y',
    },
    {
      name: 'RMSC',
      value: 'PAE: Review member submitted ECF/Katie Beckett Changes',
      activateSW: 'Y',
    },
    { name: 'PTP', value: 'PAE: Transition PACE PAE Needed', activateSW: 'Y' },
    {
      name: 'CCRP',
      value: 'APL: Create Case Referral Packet',
      activateSW: 'Y',
    },
    { name: 'CAO', value: 'PAE: Complete Annual Outreach', activateSW: 'Y' },
    {
      name: 'WLR',
      value: 'PAE: Waiver - Annual LOC Reassessment',
      activateSW: 'Y',
    },
    {
      name: 'KALR',
      value: 'PAE: Katie Beckett - Part A Annual LOC Reassessment',
      activateSW: 'Y',
    },
    {
      name: 'ELR',
      value: 'PAE: ECF - Annual LOC Reassessment',
      activateSW: 'Y',
    },
    {
      name: 'CLR',
      value: 'PAE: CHOICES - Annual LOC Reassessment',
      activateSW: 'Y',
    },
    {
      name: 'ILR',
      value: 'PAE: ICF - Annual LOC Reassessment',
      activateSW: 'Y',
    },
    {
      name: 'KBLR',
      value: 'PAE: Katie Beckett - Part B Annual LOC Reassessment',
      activateSW: 'Y',
    },
    { name: 'KAAO', value: 'PAE: KB A/C Age-Out Review', activateSW: 'Y' },
    { name: 'AURD', value: 'APL: Upload Requested Documents', activateSW: 'Y' },
    { name: 'ICAP', value: 'REF: ICAP Request', activateSW: 'Y' },
    { name: 'MOPD', value: 'PAE: Enter MOPD', activateSW: 'Y' },
    { name: 'SAR', value: 'ADJ: Safety Assessment Review', activateSW: 'Y' },
    {
      name: 'ITDD',
      value:
        'PAE: Add Service Initiation/Actual Transition/Actual Discharge Date',
      activateSW: 'Y',
    },
    {
      name: 'AIIR',
      value: 'REF: Additional Information Request from IARC Review',
      activateSW: 'Y',
    },
    {
      name: 'KTCE',
      value: 'ENR: Transition within Katie Beckett - Complete Enrollment',
      activateSW: 'Y',
    },
    { name: 'PFE', value: 'ENR: Pending FE determination', activateSW: 'Y' },
    { name: 'SH', value: 'APL: To be Set for Hearing', activateSW: 'Y' },
    { name: 'MCOA', value: 'GEN: <MMIS at-risk MCO>', activateSW: 'Y' },
    {
      name: 'UEEE',
      value: 'ENR: Update/Enter Enrollment End Date',
      activateSW: 'Y',
    },
    { name: 'TLA', value: 'PER: TEDS Link Acknowledgment', activateSW: 'Y' },
    { name: 'L2I', value: 'PER: Link Two Individuals', activateSW: 'Y' },
    { name: 'U2I', value: 'PER: Unlink Two Individuals', activateSW: 'Y' },
    { name: 'UO', value: 'APL: Upload the Order', activateSW: 'Y' },
    { name: 'ORH', value: 'APL: OGC to Reschedule a Hearing', activateSW: 'Y' },
    { name: 'UNOH', value: 'APL: Create and Upload NOH ', activateSW: 'Y' },
  ];
  taskStatusList = [
    { name: 'NW', value: 'New', activateSW: 'Y' },
    { name: 'AS', value: 'Assigned', activateSW: 'Y' },
    { name: 'IP', value: 'In Progress', activateSW: 'Y' },
    { name: 'CL', value: 'Closed', activateSW: 'Y' },
  ];
  ecfStatusRegions = '';
  ecfStatusCategory = '';
  kbStatusRegions = '';
  referralFilterData = [
    {
      errorCode: null,
      firstName: 'test',
      midInitial: 'V',
      lastName: 'test',
      ssn: '123456',
      birthDate: '2020-09-30',
      refId: '4',
      grandRegion: 'WEST',
      submissionDt: '2020-10-13',
      refStatus: 'PS',
      personId: 4,
      taskQueue: 'KBNP',
      taskStatus: 'PS',
      intakeDueDate: '2020-10-12',
      county: 'COUNTY',
    },
    {
      errorCode: null,
      firstName: 'test',
      midInitial: 'V',
      lastName: 'test',
      ssn: '123456',
      birthDate: '2020-09-30',
      refId: '4',
      grandRegion: 'WEST',
      submissionDt: '2020-10-13',
      refStatus: 'PS',
      personId: 4,
      taskQueue: 'NERI',
      taskStatus: 'CLSD',
      intakeDueDate: '2020-10-12',
      county: 'COUNTY',
    },
    {
      errorCode: null,
      firstName: 'test',
      midInitial: 'V',
      lastName: 'test',
      ssn: '123456',
      birthDate: '2020-09-30',
      refId: '4',
      grandRegion: 'WEST',
      submissionDt: '2020-10-13',
      refStatus: 'IN',
      personId: 4,
      taskQueue: 'NERI',
      taskStatus: 'NW',
      intakeDueDate: '2020-10-12',
      county: 'COUNTY',
    },
    {
      errorCode: null,
      firstName: 'test',
      midInitial: 'V',
      lastName: 'test',
      ssn: '123456',
      birthDate: '2020-09-30',
      refId: '4',
      grandRegion: 'WEST',
      submissionDt: '2020-10-13',
      refStatus: 'NW',
      personId: 4,
      taskQueue: 'NERI',
      taskStatus: 'NW',
      intakeDueDate: '2020-10-12',
      county: 'COUNTY',
      taskCompletion: '2020-10-12',
    },
    {
      errorCode: null,
      firstName: 'test',
      midInitial: 'V',
      lastName: 'test',
      ssn: '123456',
      birthDate: '2020-09-30',
      refId: '4',
      grandRegion: 'WEST',
      submissionDt: '2020-10-13',
      refStatus: 'IN',
      personId: 4,
      taskQueue: 'NERI',
      taskStatus: 'NW',
      intakeDueDate: '2020-10-12',
      county: 'COUNTY',
      taskCompletion: '2020-10-12',
    },
  ];
  displayedColumns = [
    'firstName',
    'ssn',
    'refId',
    'grandRegion',
    'submissionDt',
    'intakeDueDate',
    'refStatus',
  ];
  dataSource: MatTableDataSource<any>;
  expandedElement;
  ecfReferralStatusCount: any;
  kbMap = new Map();
  ecfMap = new Map();
  kbReferralStatusCount: any;
  ecfReferralQueue: any;
  kbReferralQueue: any;
  referralSearch: FormGroup;
  panelOpenState = false;
  matDialogRef: any;
  ecfTableToggled = false;
  kbTableToggled = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private referralDashboardService: ReferralDashboardService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.referralSearch = this.fb.group({
      searchText: [null],
      referralId: [''],
      referralStatus: [''],
      referralRecievedDate: [null],
      grandRegion: [''],
      taskStatus: [''],
      taskQueue: [''],
    });
    for (const ecfReferral of this.ecfStatusList) {
      this.ecfMap.set(ecfReferral.name, ecfReferral.value);
    }
    for (const kbReferral of this.kbStatusList) {
      this.kbMap.set(kbReferral.name, kbReferral.value);
    }
    this.countPending();
    this.countIntakeStats();
  }
  getFormData() {
    return this.referralSearch.controls;
  }

  ecfStatusRegion(region) {
    this.ecfStatusRegions = region;
    this.ecfStatusCount();
    this.ecfTableToggled = true;
  }

  ecfStatusEntity(entity) {
    this.ecfStatusCategory = entity;
    this.ecfStatusCount();
    this.ecfTableToggled = true;
  }

  ecfStatusCount() {
    this.subscription3$ = this.referralDashboardService
      .getEcfReferralStats(this.ecfStatusRegions, this.ecfStatusCategory)
      .subscribe((ecfReferralStats) => {
        this.ecfReferralStatusCount = ecfReferralStats;
      });
    this.subscriptions.push(this.subscription3$);
  }

  kbStatusRegion(region) {
    this.kbStatusRegions = region;
    this.kbStatusCount();
    this.kbTableToggled = true;
  }

  kbStatusCount() {
    this.subscription4$ = this.referralDashboardService
      .getKbReferralStats(this.kbStatusRegions)
      .subscribe((kbReferralStats) => {
        this.kbReferralStatusCount = kbReferralStats;
      });
    this.subscriptions.push(this.subscription4$);
  }

  isSupervisor() {
    this.isSupervisorSwitch = !this.isSupervisorSwitch;
    console.log('Button Clicked');
  }

  startReferral() {
    this.router.navigate(['/dashboard/referral/startReferral']);
  }

  countPending() {
    this.subscription1$ = this.referralDashboardService
      .getCountPendingReferral()
      .subscribe((pendingReferralCountResponse) => {
        this.pendingReferralCount = pendingReferralCountResponse.body;
      });
    this.subscriptions.push(this.subscription1$);
  }
  countIntakeStats() {
    this.subscription2$ = this.referralDashboardService
      .getIntakeStats()
      .subscribe((intakeStatsResponse) => {
        this.futureDues5Days = intakeStatsResponse.body.futureDues5Days;
        this.pastDuesPendingCount =
          intakeStatsResponse.body.pastDuesPendingCount;
        this.totalPendingCount = intakeStatsResponse.body.totalPendingCount;
        if (this.pastDuesPendingCount > 0) {
          this.alertPastDue = true;
        }
      });
    this.subscriptions.push(this.subscription2$);
  }

  myOpenTasks() {
    if (!this.isMyOpenTasksClicked) {
      this.subscription5$ = this.referralDashboardService
        .getReferralQueueCount()
        .subscribe((referralQueueResponse) => {
          this.ecfReferralQueue = referralQueueResponse.body.ecfRefReviewCount;
          this.kbReferralQueue =
            referralQueueResponse.body.katieBeckettRefReviewCount;
        });
      this.subscriptions.push(this.subscription5$);
    }
    this.isMyOpenTasksClicked = true;
  }

  referralAdditionalSearch() {
    let recievedDateStringFormat = '';
    if (this.getFormData().referralRecievedDate.value !== null) {
      recievedDateStringFormat = this.getFormData().referralRecievedDate.value.toJSON();
    }
    this.panelOpenState = false;
    if (
      this.getFormData().searchText.value === null ||
      this.getFormData().searchText.value === ''
    ) {
      const referralFilterRequest = new ReferralFilter(
        this.getFormData().grandRegion.value,
        0,
        recievedDateStringFormat,
        this.getFormData().referralStatus.value,
        this.getFormData().taskQueue.value,
        this.getFormData().taskStatus.value
      );
      console.log(referralFilterRequest);
      this.Accordion.closeAll();
      this.searchReferralClicked = true;
      this.dataSource = new MatTableDataSource(this.referralFilterData);
    }
  }

  initiateIntakeClicked() {
    this.router.navigate(['/dashboard/referral/referralIntakeActions']);
  }

  deleteButtonClicked(refId) {
    const referralIdToDelete = refId;
    this.matDialogRef = this.dialog.open(DeleteRecordPopupComponent, {
      width: '45vw',
      height: 'auto',
    });
    this.subscription6$ = this.matDialogRef.afterClosed()
      .subscribe((isDelete) => {
        if (isDelete) {
          console.log('Delete Confirm');
          this.subscription7$ = this.referralDashboardService
            .deleteReferral(referralIdToDelete)
            .subscribe((deleteResponse) => {
              console.log(deleteResponse);
            });
          this.subscriptions.push(this.subscription7$);
        } else {
          console.log('Delete Rejected');
        }
      });
    this.subscriptions.push(this.subscription6$);
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    console.log('Unsubscribed');
  }
}
