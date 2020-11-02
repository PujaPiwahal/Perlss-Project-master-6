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
  selector: 'app-medical-diagnosis-hcbs-application',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './medical-diagnosis-hcbs-application.component.html',
  styleUrls: ['./medical-diagnosis-hcbs-application.component.scss']
})
export class MedicalDiagnosisHcbsApplicationComponent implements OnInit {
  submitted: boolean;
  meidicalDiagnosis: any;
  customValidation = customValidation;
  medicalDiagnosis: FormGroup;
  constructor(private fb: FormBuilder,
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
      chronicDiagnosisSw: [''],
      medicalDiagnosisCdList: ['']
    });
  }

  switchChronicDiagnoses(matRadioChange: MatRadioChange) {
    // if (matRadioChange.value === 'Y') {
    //   this.showPresentingChronicDiagnosis = true;
    // } else {
    //   this.showPresentingChronicDiagnosis = false;
    // }
  }

  selectMedicalDiagnosis(event) {

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
