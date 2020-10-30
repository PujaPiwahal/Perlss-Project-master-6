import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import { MatSelectChange } from '@angular/material/select';
import { CustomvalidationService } from 'src/app/_shared/utility/customvalidation.service';
import * as customValidation from '../../_shared/constants/validation.constants';

@Component({
  selector: 'app-medical-diagnosis',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './medical-diagnosis.component.html',
  styleUrls: ['./medical-diagnosis.component.scss']
})
export class MedicalDiagnosisComponent implements OnInit {
  customValidation = customValidation;
  medicalDiagnosis: FormGroup;
  showPsychologicalSection = false;
  showDocumentSection = false;
  documentList: string[] = ['ISP', 'School Records', 'Other'];
  showOtherSection = false;
  showLevelIntellectualSection = false;
  showPresentingChronicDiagnosis = false;
  constructor(private fb: FormBuilder,
              private customValidator: CustomvalidationService) { }

  getFormData() {
    return this.medicalDiagnosis.controls;
  }
  ngOnInit(): void {
    this.medicalDiagnosis = this.fb.group({
      intellectualDisabilitySw: [''],
      physEvalSw: [''],
      medDocumentCd: [''],
      levelIntelDisabilityCd:[''],
      iqTestScore: [''],
      iqTestDt: [''],
      iqTestDesc: [''],
      chronicDiagnosisSw: [''],
      medicalDiagnosisCdList: ['']
    });
  }

  switchIntellectualDisability(matRadioChange: MatRadioChange) {
    if (matRadioChange.value === 'Y') {
      this.showPsychologicalSection = true;
    } else {
      this.showPsychologicalSection = false;
    }
  }

  switchPsychologicalEvaluation(matRadioChange: MatRadioChange) {
    console.log("matRadioChange=====", matRadioChange.value);
    if (matRadioChange.value === 'N') {
      this.showLevelIntellectualSection = false;
      this.showDocumentSection = true;
    } else {
      this.showDocumentSection = false;
      this.showLevelIntellectualSection = true;
    }
  }

  selectDocument(matSelectChange: MatSelectChange) {
    console.log('value=====', matSelectChange.value);
  }

  switchChronicDiagnoses(matRadioChange: MatRadioChange) {
    if (matRadioChange.value === 'Y') {
      this.showPresentingChronicDiagnosis = true;
    } else {
      this.showPresentingChronicDiagnosis = false;
    }
  }

  onSubmit() {

  }

}
