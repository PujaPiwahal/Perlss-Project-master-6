import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pae-dashboard',
  templateUrl: './pae-dashboard.component.html',
  styleUrls: ['./pae-dashboard.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ]
})
export class PaeDashboardComponent implements OnInit {
  isMyOpenTasksClicked = false;
  panelOpenState = false;
  @ViewChild('accordion', { static: true }) Accordion: MatAccordion;
  paeSearch: FormGroup;
  searchReferralClicked = false;
  paeStatusList = [
    {
        code: 'PE',
        value: 'Pending Submission',
        activateSW: 'Y'
    },
    {
       code: 'AD',
        value: 'Pending Adjudication',
        activateSW: 'Y'
    },
    {
        code: 'AP',
        value: 'Approved',
        activateSW: 'Y'
    },
    {
        code: 'AA',
        value: 'Approved At Risk',
        activateSW: 'Y'
    },
    {
        code: 'DN',
        value: 'Denied',
        activateSW: 'Y'
    },
    {
        code: 'CL',
        value: 'Closed',
        activateSW: 'Y'
    },
    {
        code: 'WI',
        value: 'Withdrawn',
        activateSW: 'Y'
    },
    {
        code: 'IN',
        value: 'Inactive',
        activateSW: 'Y'
    }
];

enrollmentGroupList = [
  {
      code: 'CG1',
      value: 'CHOICES Group 1',
      activateSW: 'Y'
  },
  {
      code: 'CG2',
      value: 'CHOICES Group 2',
      activateSW: 'Y'
  },
  {
      code: 'CG3',
      value: 'CHOICES Group 3',
      activateSW: 'Y'
  },
  {
      code: 'EC4',
      value: 'ECF CHOICES Group 4',
      activateSW: 'Y'
  },
  {
      code: 'EC5',
      value: 'ECF CHOICES Group 5',
      activateSW: 'Y'
  },
  {
      code: 'EC6',
      value: 'ECF CHOICES Group 6',
      activateSW: 'Y'
  },
  {
      code: 'EC7',
      value: 'ECF CHOICES Group 7',
      activateSW: 'Y'
  },
  {
      code: 'EC8',
      value: 'ECF CHOICES Group 8',
      activateSW: 'Y'
  },
  {
      code: 'PACE',
      value: 'PACE',
      activateSW: 'Y'
  },
  {
      code: 'ICF',
      value: 'ICF/IID',
      activateSW: 'Y'
  },
  {
      code: 'CAC',
      value: 'CAC',
      activateSW: 'Y'
  },
  {
      code: 'KBA',
      value: 'Katie Beckett Part A',
      activateSW: 'Y'
  },
  {
      code: 'KBB',
      value: 'Katie Beckett Part B',
      activateSW: 'Y'
  },
  {
     code: 'SED',
      value: 'Self-Determination Waiver',
      activateSW: 'Y'
  },
  {
      code: 'STW',
      value: 'Statewide Waiver',
      activateSW: 'Y'
  }
];

grandRegionList = [
  { code: 'WR', value: 'West Region', activateSW: 'Y' },
  { code: 'MR', value: 'Middle Region', activateSW: 'Y' },
  { code: 'ER', value: 'East Region', activateSW: 'Y' },
];

paeFilterData = [
  {
    errorCode: null,
    firstName: 'test',
    midInitial: 'V',
    lastName: 'test',
    ssn: '123456',
    birthDate: '2020-09-30',
    paeId: '4',
    grandRegion: 'WEST',
    reassignmentDate: '2020-10-13',
    paeStatus: 'PS',
    personId: 4,
    taskQueue: 'KBNP',
    taskStatus: 'PS',
    recertificationDue: '2020-10-12',
    county: 'COUNTY',
    enrollmentGroup : 'STW',
    refId : 'RF234234',
    appealFiled: '',
    slotStatus: 'Held'
  },
  {
    errorCode: null,
    firstName: 'test',
    midInitial: 'V',
    lastName: 'test',
    ssn: '123456',
    birthDate: '2020-09-30',
    paeId: '4',
    grandRegion: 'WEST',
    reassignmentDate: '2020-10-13',
    paeStatus: 'PS',
    personId: 4,
    taskQueue: 'NERI',
    taskStatus: 'CLSD',
    recertificationDue: '2020-10-12',
    county: 'COUNTY',
    enrollmentGroup : 'STW',
    refId : 'RF234234',
    appealFiled: '',
    slotStatus: 'Held'
  },
  {
    errorCode: null,
    firstName: 'test',
    midInitial: 'V',
    lastName: 'test',
    ssn: '123456',
    birthDate: '2020-09-30',
    paeId: '4',
    grandRegion: 'WEST',
    reassignmentDate: '2020-10-13',
    paeStatus: 'IN',
    personId: 4,
    taskQueue: 'NERI',
    taskStatus: 'NW',
    recertificationDue: '2020-10-12',
    county: 'COUNTY',
    enrollmentGroup : 'STW',
    refId : 'RF234234',
    appealFiled: '',
    slotStatus: 'Held'
  },
  {
    errorCode: null,
    firstName: 'test',
    midInitial: 'V',
    lastName: 'test',
    ssn: '123456',
    birthDate: '2020-09-30',
    paeId: '4',
    grandRegion: 'WEST',
    reassignmentDate: '2020-10-13',
    paeStatus: 'NW',
    personId: 4,
    taskQueue: 'NERI',
    taskStatus: 'NW',
    recertificationDue: '2020-10-12',
    county: 'COUNTY',
    taskCompletion: '2020-10-12',
    enrollmentGroup : 'STW',
    refId : 'RF234234',
    appealFiled: '',
    slotStatus: 'Held'
  },
  {
    errorCode: null,
    firstName: 'test',
    midInitial: 'V',
    lastName: 'test',
    ssn: '123456',
    birthDate: '2020-09-30',
    paeId: '4',
    grandRegion: 'WEST',
    reassignmentDate: '2020-10-13',
    paeStatus: 'IN',
    personId: 4,
    taskQueue: 'NERI',
    taskStatus: 'NW',
    recertificationDue: '2020-10-12',
    county: 'COUNTY',
    taskCompletion: '2020-10-12',
    enrollmentGroup : 'STW',
    refId : 'RF234234',
    appealFiled: '',
    slotStatus: 'Held',
    recievedInQueue: '2020-10-12'
  },
];
  displayedColumns = [
    'firstName',
    'ssn',
    'grandRegion',
    'paeId',
    'enrollmentGroup',
    'paeStatus',
  ];
  dataSource: MatTableDataSource<any>;
  expandedElement;
  paeStatusMap = new Map();


  constructor(private fb: FormBuilder,
              private router: Router) { }

  ngOnInit() {

    this.paeSearch = this.fb.group({
      searchText: [null],
      referralId: [''],
      paeId: [''],
      paeStatus: [''],
      grandRegion: [''],
      enrollmentGroup: [''],
    });
    for (const paeStatus of this.paeStatusList) {
      this.paeStatusMap.set(paeStatus.code, paeStatus.value);
    }
  }

  startNewPae(){
    // TODO redirection
    this.router.navigate(['/dashboard/pae/applicantInformation']);
  }

  myOpenTasks(){
    // TODO get call to recieve the queue
    this.isMyOpenTasksClicked = true;
  }

  paeAdditionalSearch(){
    // TODO append form data and perform search
    this.panelOpenState = false;
    this.Accordion.closeAll();
    this.searchReferralClicked = true;
    this.dataSource = new MatTableDataSource(this.paeFilterData);

  }
  initiateIntakeClicked(){

  }

}
