import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder,  FormGroup, Validators } from '@angular/forms';
import { PaeService } from '../../core/services/pae/pae.service';
import { Router } from '@angular/router';
import {  HttpResponse } from '@angular/common/http/';
import * as customValidation from '../../_shared/constants/validation.constants';
import { CustomvalidationService } from '../../_shared/utility/customvalidation.service';

@Component({
  selector: 'app-pae-welcome',
  templateUrl: './pae-welcome.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./pae-welcome.component.scss'],
})
export class PaeWelcomeComponent implements OnInit {

  customValidation = customValidation;
  PaeWelcomeForm: FormGroup;
  nextClicked: boolean;
  statusAction: string = null;
  showWaiting: boolean = false;
  paeId: string = "PAE1000030";
  taskId: string = "2345";
  showResult: boolean = false;
  statusIsBlueCare: boolean = true;
  statusSsi: string;
  statusHasECFReferral: boolean;
  statusExtension: boolean;
  statusHasKBRef: boolean;
  closureComments: string = "";
  error: string;
  safetyEvaluationDueDate: string = "06/16/2012"
  f: any;
  applicantDataJson: string;
  applicantData: Array<any>;
  dataMap: any = {
    applicant: [
      ['APPLICANT NAME', 'applicantVO.firstName|lastName|midInitial'], ['PAE ID', 'applicantVO.paeId'],
      ['PERSON ID', 'applicantVO.id'], ['PAST DUE DATE', 'paeVO.dueDt', 'date'],
      ['DATE OF BIRTH', 'applicantVO.dobDt', "date"], ['PAE STATUS', 'refReqVO.refStatus'],
      ['SSN', 'applicantVO.ssn'], ['REASSESSMENT DUE DATE', 'paeVO.reassessmentDueDt', 'date'],
      ['ASSIGNED ENTITY', 'refReqVO.assignedEntity'], ['ASSIGNED USER', 'refReqVO.assignedUserId']
    ],
    referralData: {
      base: [
        ['REFERRAL RECEIVED DATE', 'paeVO.paeRequestDt', 'date'], ['REFERRAL ID', 'refReqVO.refId'],
        ['REFERRAL SOURCE', 'refReqVO.sourceCd'], ['REFERRAL STATUS', 'refReqVO.refStatus'],
      ],
      kbReferral: [
        ['PART B ASSESSMENT STATUS', ''], ['PART A ASSESSMENT STATUS', ''],
        ['PART B SLOT STATUS', ''], ['PART A SLOT STATUS', ''],
        ['PART B DATE HELD', ''], ['PART A DATE HELD', ''],
        ['PART B DATE FILLED', '', "date"], ['PART A DATE FILLED', '', "date"]
      ],
      ecfReferral: [
        ['ECF SLOT TYPE', ''], ['DATE HELD', ''],
        ['ECF SLOT STATUS', ''], ['DATE HELD', '', "date"]
      ]
    }
  };
  showSubmitButton: boolean = false;

  constructor(
    private fb: FormBuilder,
    private paeService: PaeService,
    private router: Router,
    private customValidator: CustomvalidationService
  ) { }

  ngOnInit(): void {
    this.PaeWelcomeForm = this.fb.group({
      action: ['', [Validators.required]],
      safetyEval: [''],
      ssiStatus: [''],
      requestExtension: [''],
      statusAverageCostOfCare: [''],
      closureReason: [''],
      closureComments: [''],
      closureAttest:  ['']
    });

    this.f = this.getControls();

    this.statusHasKBRef = true;

  }

  getByPaeId() {
    const response = this.paeService.getWelcomeByPaeId(this.paeId);
    const that = this;
    this.showWaiting = true;
    response.then(function(response: HttpResponse<any>) {
      that.prepareData(response);
      that.showResult = true;
    }).catch(function(reason) {
      that.showWaiting = false;
      that.error = "Error:\n" + typeof reason == "string" ? reason : JSON.stringify(reason, null, "  ");
    });
  }

  getByTaskId() {
    const response = this.paeService.getWelcomeByTaskId(this.taskId);
    const that = this;
    this.showWaiting = true;
    response.then(function(response: HttpResponse<any>) {
      that.prepareData(response);
      that.showResult = true;
    }).catch(function(reason) {
      that.showWaiting = false;
      that.error = "Error:\n" + typeof reason == "string" ? reason : JSON.stringify(reason, null, "  ");
    });
  }

  addDashes(x: string) {
    return x === "" ? "\u2508" : x;
  }

  makeRows(data: any, dataMap: any, outData: Array<any>) {
    let row = new Array<any>();
    dataMap.forEach(element => {

      let textValue: string = null;

      try {
        if (element[1].length > 0) {
          let split = element[1].split(".");
          let dataRef = data;

          for (let i = 0; i < split.length - 1; i++) {
            dataRef = dataRef[split[i]];
          }
          let text = [];
          split = split.pop().split("|");
          split.forEach(x => { text.push(dataRef[x]);  });
          textValue = text.join(' ');

          if (element[2] && textValue.length > 9 && element[2] == "date") {
            let d = textValue.substring(0, 10).split('-');
            textValue =  d[1] + "/" + d[2] + "/" + d[0];
          }
        }
      } catch (e) {
        textValue = "Error: " + element[1];
      }

      row.push({ label: element[0], value: this.addDashes(textValue) });
      if (row.length == 2) {
        outData.push(row);
        row = new Array<any>();
      }
    });
  }

  prepareData(data: any) {
    
    let outData = new Array<any>();
    this.makeRows(data, this.dataMap.applicant, outData);
    if (this.statusHasECFReferral || this.statusHasKBRef) {
      outData.push("separator");
      this.makeRows(data, this.dataMap.referralData.base, outData);
      if (this.statusHasKBRef) {
        this.makeRows(data, this.dataMap.referralData.kbReferral, outData);
      } else {
        this.makeRows(data, this.dataMap.referralData.ecfReferral, outData);
      }
    }

    this.applicantData = outData;
    this.applicantDataJson = JSON.stringify(outData);
  }

  onActionChange(value: string) {
    this.statusAction = value;
    this.showSubmitButton = this.statusAction =='paeSubmit';
        
  }

  getControl(name: string): AbstractControl {
    return this.PaeWelcomeForm.get(name);
  }

  onSsiStatusChange(value: string) {
    this.statusSsi = value;
    if (this.statusSsi.length > 0) {
    }
  }

  onExtensionChange(event) {
    this.statusExtension = event.target.value;
  }

  getControls() {
    return this.PaeWelcomeForm.controls;
  }

  onSubmitClick() {

  }

  updateClosureComments(event) {
    this.closureComments = event.target.value;
  }

  onNextClick() {

  }

  onSubmit() {
    //evaluation done here;
  }


}
