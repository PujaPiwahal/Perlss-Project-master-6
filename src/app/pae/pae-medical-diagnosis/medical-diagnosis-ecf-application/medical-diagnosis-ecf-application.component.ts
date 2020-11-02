import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { CustomvalidationService } from '../../../_shared/utility/customvalidation.service';
import * as customValidation from '../../../_shared/constants/validation.constants';
import { MedicalDiagonsis } from '../../Diagnosisdata';
import { MedicalDiagnosisService } from '../../../core/services/pae/medicalDiagnosis/medical-diagnosis.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-medical-diagnosis-ecf-application',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './medical-diagnosis-ecf-application.component.html',
  styleUrls: ['./medical-diagnosis-ecf-application.component.scss']
})
export class MedicalDiagnosisEcfApplicationComponent implements OnInit {
  meidicalDiagnosis: any;
  customValidation = customValidation;
  medicalDiagnosis: FormGroup;
  showPsychologicalSection = false;
  showDocumentSection = false;
  documentList: string[] = ['ISP', 'School Records', 'Other'];
  showOtherSection = false;
  showLevelIntellectualSection = false;
  showPresentingChronicDiagnosis = false;
  submitted: boolean = false;
  constructor(private fb: FormBuilder,
    private router: Router,
    private medicalDiagnosisService: MedicalDiagnosisService,
    private customValidator: CustomvalidationService,
    private medicalDiagonsis: MedicalDiagonsis) { }

  getFormData() {
    return this.medicalDiagnosis.controls;
  }
  ngOnInit(): void {
    this.meidicalDiagnosis = this.medicalDiagonsis.data;
    this.medicalDiagnosis = this.fb.group({
      targetPopDiagnosisCd: ['', [Validators.required]],
      physEvalSw: [''],
      medDocumentCd: [''],
      levelIntelDisabilityCd: [''],
      iqTestScore: [''],
      iqTestDt: [''],
      iqTestDesc: [''],
      chronicDiagnosisSw: [''],
      medicalDiagnosisCdList: [''],
      docDetailsDesc: ['']
    });
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
    console.log('value=====', event[0].name);
    if (event[0].name == 'Other') {
      this.showOtherSection = true;
    } else {
      this.showOtherSection = false;
    }
  }

  switchChronicDiagnoses(matRadioChange: MatRadioChange) {
    if (matRadioChange.value === 'Y') {
      this.showPresentingChronicDiagnosis = true;
    } else {
      this.showPresentingChronicDiagnosis = false;
    }
  }

  selectTargetPopulation(matSelectChange: MatSelectChange) {
    console.log('value=====', matSelectChange.value);
    if (matSelectChange.value == 'ID') {
      this.showPsychologicalSection = true;
      this.medicalDiagnosis.get('physEvalSw').setValidators(Validators.required);
    } else {
      this.showPsychologicalSection = false;
      this.showLevelIntellectualSection = false;
      this.showDocumentSection = false;
      this.medicalDiagnosis.get('physEvalSw').clearValidators();
    }
  }

  selectMedicalDiagnosis(event) {
    console.log("event===", this.medicalDiagnosis)
    for (let i = 0; i < 0; i++) {
      this.medicalDiagnosis.controls.medicalDiagnosisCdList.setValue({ "id": event[i].id })

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
