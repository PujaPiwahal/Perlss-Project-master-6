import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
//import { MatSelectChange } from '@angular/material/select';
import { CustomvalidationService } from '../../../_shared/utility/customvalidation.service';
import * as customValidation from '../../../_shared/constants/validation.constants';
import { MedicalDiagonsis } from '../../Diagnosisdata';
import { MedicalDiagnosisService } from '../../../core/services/pae/medicalDiagnosis/medical-diagnosis.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-medical-diagnosis-kb-application',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './medical-diagnosis-kb-application.component.html',
  styleUrls: ['./medical-diagnosis-kb-application.component.scss']
})
export class MedicalDiagnosisKbApplicationComponent implements OnInit {
  meidicalDiagnosis: any;
  customValidation = customValidation;
  medicalDiagnosis: FormGroup;
  addDiagnosisDetails: FormGroup;
  showPresentingChronicDiagnosis: boolean = false;
  panelOpenState = false;
  showOtherSection: boolean = false;
  submitted: boolean = false;
  showAddDiagnosisForm: boolean = true;
  constructor(private fb: FormBuilder,
    private router: Router,
    private medicalDiagnosisService: MedicalDiagnosisService,
    private customValidator: CustomvalidationService, private medicalDiagonsis: MedicalDiagonsis) { }

  getFormData() {
    return this.medicalDiagnosis.controls;
  }

  getAddDiagnosisFormData() {
    return this.addDiagnosisDetails.controls;
  }
  ngOnInit(): void {
    this.meidicalDiagnosis = this.medicalDiagonsis.data;
    this.medicalDiagnosis = this.fb.group({
      chronicDiagnosisSw: ['', [Validators.required]],
      medicalDiagnosisCdList: [''],
      docDetailsDesc: [''],
      presistedSw: [''],
      expectedSw: [''],
      primarySw: ['']
    });
    this.addDiagnosisDetails = this.fb.group({
      medicalDiagnosisCdList: [''],
      docDetailsDesc: [''],
      presistedSw: ['', [Validators.required]],
      expectedSw: ['', [Validators.required]],
      primarySw: ['', [Validators.required]]
    });
  }

  switchChronicDiagnoses(matRadioChange: MatRadioChange) {
    if (matRadioChange.value === 'Y') {
      this.showPresentingChronicDiagnosis = true;
    } else {
      this.showPresentingChronicDiagnosis = false;
    }
  }

  selectMedicalDiagnosis(event) {
    console.log('value=====', event.name);
    if (event.name == 'Other') {
      this.showOtherSection = true;
    } else {
      this.showOtherSection = false;
    }
  }

  toggleAddDiagnosis() {
    this.showAddDiagnosisForm = false;
  }

  cancelAddDiagnosis() {
    this.showAddDiagnosisForm = true;
  }

  async onSubmit() {
    this.submitted = true;
    console.log("this.medicalDiagnosis.valid===", this.addDiagnosisDetails.valid)
    if (this.addDiagnosisDetails.valid) {
      try {
        let response = await this.medicalDiagnosisService.saveMedicalDiagnosis({
          ...this.addDiagnosisDetails.value,
        });
        // this.myForm.reset();
        console.log(response);
      } catch (e) {

      }
    }
  }



  sendingYesorNo(input: boolean) {
    if (input === true) {
      return 'Y';
    } else if (input === false) {
      return 'N';
    }
    else {
      return null;
    }
  }

  goBack() {
    this.router.navigate(['dashboard/pae/diagnosisSummary']);
  }

}
