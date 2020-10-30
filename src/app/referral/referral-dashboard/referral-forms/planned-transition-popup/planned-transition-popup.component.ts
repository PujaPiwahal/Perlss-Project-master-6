import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, ChangeDetectionStrategy, ComponentRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl } from '@angular/forms';
import { CustomvalidationService } from '../../../../_shared/utility/customvalidation.service';
import { RefPlannedTransition } from '../../../../_shared/model/RefPlannedTransition';
import { ReferralService } from '../../../../core/services/referral/referral.service';
import * as customValidation from '../../../../_shared/constants/validation.constants';
import { HttpResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-planned-transition-popup',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './planned-transition-popup.component.html',
  styleUrls: ['./planned-transition-popup.component.scss'],
})
export class PlannedTransitionPopupComponent implements OnInit {

  myForm: FormGroup;
  customValidation = customValidation;
  get f() {
    return this.myForm.controls;
  };
  otherClicked = false;
  id: number = null;
  intakeOutcomeId = 1;
  choiceArray;

  info: Array<any> = [
    {
      text: "",
      id: "notQualEnrolPcTxt",
      label: "Please explain why this person does not appear to qualify for enrollment in an open Priority Category"
    },
    {
      text: "",
      id: "currLvngArrngTxt",
      label: "Describe current living arrangement and care/support provided by the primary caregiver"
    },
    {
      text: "",
      id: "currHlthCondTxt",
      label: "Details regarding current health condition of person's caregiver including diagnosis, when the condition began, severity of symptoms, and current and expected progression of decline"
    },
    {
      text: "",
      id: "amtTimeCareAsstTxt",
      label: "Anticipated amount of time the primary caregiver will be able to assist in supporting the person"
    },
    {
      text: "",
      id: "caregvrPartiPlanTxt",
      label: "Description of the primary caregiver's understanding, willingness, and ability to participate in planning for the person's transition to community living"
    },
    {
      text: "",
      id: "personPartiPlanTxt",
      label: "Description of the person's understanding, willingess, and ability to participate in planning for the transition to community living"
    },
    {
      text: "",
      id: "supCaregvrInhomeTxt",
      label: "Description of support provided by other caregivers that are in the home or who provide support to the person on a regular basis"
    },
    {
      text: "",
      id: "otherSupportAvailTxt",
      label: "Other supports/resources that will be available to assist in planning for the person's transition to community living"
    },
    {
      text: "",
      id: "rsnForPlannTransTxt",
      label: "Describe your observations of the current circumstance and reason for Planned Transition to Community Living criteria request"
    },
    {
      text: "",
      id: "electronicSignature",
      label: "Electronic Signature"
    }
    
  ];

  constructor(
    private ref: ChangeDetectorRef,
    public dialogRef: MatDialogRef<PlannedTransitionPopupComponent>,
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private referralService: ReferralService
  ) {

    this.myForm = this.fb.group({
      verifTargetPopulnSw: [''],
      adaptBehLsaResSw: [''],
      legalDocumentsSw: [''],
      physClinicalNoteSw: [''],
      otherSw: [''],
      otherDescription: [''],
      electronicSignature: ['', [Validators.required]],
      naturalOnlyFamilySw: ['', [Validators.required]],
      cannotLiveIndSuppSw: ['', [Validators.required]],
      caregiverPoorHlthSw: ['', [Validators.required]],
      needSupSmoothTranSw: ['', [Validators.required]],
      willPartPlnndTranSw: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {

  }

  otherClick() {

    let that = this;
    let timeout = setTimeout(function () {
      let value = that.myForm.get("otherSw").value;
      that.otherClicked = value;
      that.myForm.get('otherValue').setValidators(value === "true" ? [Validators.required] : null);
    }, 100)
  }

  submit() {
    if (!this.myForm.valid) {

      let required = [
        "adaptBehLsaResSw",
        "cannotLiveIndSuppSw",
        "caregiverPoorHlthSw",
        "electronicSignature",
        "legalDocumentsSw",
        "naturalOnlyFamilySw",
        "needSupSmoothTranSw",
        "otherDescription",
        "otherSw",
        "willPartPlnndTranSw"
      ];
      
      required.forEach(element => {
        this.myForm.controls[element].markAsTouched();        
      })
      return;

    }
    let paramList: Array<string> = [
      //"id:number",
      //"intakeOutcomeId:number",
      "adaptBehLsaResSw|f",
      "amtTimeCareAsstTxt|info",
      "cannotLiveIndSuppSw|f",
      "caregiverPoorHlthSw|f",
      "caregvrPartiPlanTxt|info",
      "currHlthCondTxt|info",
      "currLvngArrngTxt|info",
      "electronicSignature|info",
      "legalDocumentsSw|f",
      "naturalOnlyFamilySw|f",
      "needSupSmoothTranSw|f",
      "notQualEnrolPcTxt|info",
      "otherDescription|f",
      "otherSupportAvailTxt|info",
      "otherSw|f",
      "personPartiPlanTxt|info",
      "physClinicalNoteSw|f",
      "rsnForPlannTransTxt|info",
      "supCaregvrInhomeTxt|info",
      "verifTargetPopulnSw|f",
      "willPartPlnndTranSw|f"
    ];

    let params = [];

    let infoMap = {};
    for (let j = 0; j < this.info.length; j++) {
      infoMap[this.info[j].id] = j;
    }
    const data = new RefPlannedTransition(
      this.id, this.intakeOutcomeId, "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      "", "", "", "", "",
      ",", "", "");

    for (let i = 0; i < paramList.length; i++) {
      let s = paramList[i].split('|');

      try {
        switch (s[1]) {

          case "f":
            let value = this.myForm.get(s[0]).value;
            if (s[0].substr(-2) === 'Sw' && (value === '' || value === 'N') ) {
              value = 'N';
            }else if (s[0].substr(-2) === 'Sw' && (value || value === 'Y')) {
              value = 'Y';
            }
            data[s[0]] = value; 
            break;

          case "info":
            data[s[0]] = this.info[infoMap[s[0]]].text;
            break;
        }

        console.log(s[0] + "=" + data[s[0]]);
      } catch (e) {
        console.log("Error getting " + s[0] + ": " + e.message);
      }
    }

    const response = this.referralService.savePlannedTransition(data);

    const that = this;
    response.then(function (response: HttpResponse<any>) {
      response = response.body;
      that.closePopup();
    }).catch(function (reason) {
      alert(reason);
    });

  }

  updateInfo(event) {
    let index = event.target.getAttribute('index');
    this.info[index].text = event.target.value;
  }

  closePopup() {
    this.dialogRef.close();
  }
}
