import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { CustomvalidationService } from 'src/app/_shared/utility/customvalidation.service';
import * as customValidation from '../../_shared/constants/validation.constants';
import { MedicalDiagonsis } from '../Diagnosisdata';
import { MedicalDiagnosisService } from '../../core/services/pae/medicalDiagnosis/medical-diagnosis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medical-diagnosis',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './medical-diagnosis-icf-application.component.html',
  styleUrls: ['./medical-diagnosis-icf-application.component.scss']
})
export class MedicalDiagnosisICFComponent implements OnInit {
  meidicalDiagnosis: any;
  customValidation = customValidation;
  medicalDiagnosis: FormGroup;
  showPsychologicalSection = false;
  showDocumentSection = false;
  showOtherSection = false;
  showLevelIntellectualSection = false;
  showPresentingChronicDiagnosis = false;
  submitted: boolean = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private customValidator: CustomvalidationService,
    private medicalDiagonsis: MedicalDiagonsis,
    private medicalDiagnosisService: MedicalDiagnosisService
  ) { }

  getFormData() {
    return this.medicalDiagnosis.controls;
  }
  ngOnInit(): void {
    this.meidicalDiagnosis = this.medicalDiagonsis.data;
    this.medicalDiagnosis = this.fb.group({
      intellectualDisabilitySw: [''],
      physEvalSw: [''],
      medDocumentCd: [''],
      levelIntelDisabilityCd: [''],
      iqTestScore: [''],
      iqTestDt: [''],
      iqTestDesc: [''],
      chronicDiagnosisSw: ['', [Validators.required]],
      medicalDiagnosisCdList: [''],
      docDetailsDesc: ['']
    });
  }

  switchIntellectualDisability(matRadioChange: MatRadioChange) {
    if (matRadioChange.value === 'Y') {
      this.showPsychologicalSection = true;
      this.medicalDiagnosis.get('physEvalSw').setValidators(Validators.required);
    } else {
      this.showPsychologicalSection = false;
      this.medicalDiagnosis.get('physEvalSw').clearValidators();
      this.showDocumentSection = false;
      this.showLevelIntellectualSection = false;
    }
  }

  switchPsychologicalEvaluation(matRadioChange: MatRadioChange) {
    if (matRadioChange.value === 'N') {
      this.showLevelIntellectualSection = false;
      this.showDocumentSection = true;
      this.medicalDiagnosis.get('levelIntelDisabilityCd').clearValidators();
      this.medicalDiagnosis.get('iqTestScore').clearValidators();
      this.medicalDiagnosis.get('iqTestDt').clearValidators();
    } else {
      this.showDocumentSection = false;
      this.showLevelIntellectualSection = true;
      this.medicalDiagnosis.get('levelIntelDisabilityCd').setValidators(Validators.required);
      this.medicalDiagnosis.get('iqTestScore').setValidators(Validators.required);
      this.medicalDiagnosis.get('iqTestDt').setValidators(Validators.required);
    }
  }

  selectDocument(event) {
    if (event[0].name == 'Other') {
      this.showOtherSection = true;
    } else {
      this.showOtherSection = false;
    }
  }

  switchChronicDiagnoses(matRadioChange: MatRadioChange) {
    console.log("switchChronicDiagnoses====", matRadioChange)
    if (matRadioChange.value === 'Y') {
      this.showPresentingChronicDiagnosis = true;
      this.medicalDiagnosis.get('medicalDiagnosisCdList').setValidators(Validators.required);
    } else {
      this.showPresentingChronicDiagnosis = false;
      this.medicalDiagnosis.get('medicalDiagnosisCdList').clearValidators();
    }
  }

  selectMedicalDiagnosis(event) {
    console.log("event====", event)
    if (event.length <= 0) {
      this.medicalDiagnosis.get('medicalDiagnosisCdList').clearValidators();
    }
  }

  async onSubmit() {
    this.submitted = true;
    console.log("√=====", this.medicalDiagnosis.valid)
    if (this.medicalDiagnosis.valid) {
      try {
        let response = await this.medicalDiagnosisService.saveMedicalDiagnosis({
          ...this.medicalDiagnosis.value,
        });
        // this.myForm.reset();
        console.log(response);
      } catch (e) {

      }
    }
  }
  goBack() {
    this.router.navigate(['dashboard/pae/diagnosisSummary']);
  }

}
