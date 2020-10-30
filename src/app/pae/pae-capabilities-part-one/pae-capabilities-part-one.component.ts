import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidation from '../../_shared/constants/validation.constants';
import { CustomvalidationService } from '../../_shared/utility/customvalidation.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-pae-capabilities-part-one',
  templateUrl: './pae-capabilities-part-one.component.html',
  styleUrls: ['./pae-capabilities-part-one.component.scss']
})
export class PaeCapabilitiesPartOneComponent implements OnInit {
  customValidation = customValidation;
  submitted = false;
  transfers = false;
  mobility = false;
  eating = false;
  toileting = false;
  bathing = false;
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private customValidator: CustomvalidationService,
    private router: Router
  ) { }

  getFormData() {
    return this.myForm.controls;
  }

  get f() {
    return this.myForm.controls;
  }
  ngOnInit() {
    this.myForm = this.fb.group({
      transfers: ['', [Validators.required]],
      mobility: ['', [Validators.required]],
      eating: ['', [Validators.required]],
      toileting: ['', [Validators.required]],
      bathing: ['', [Validators.required]]
    });
  }

  next() {
    this.submitted = true;
    console.log(this.myForm.valid);
    if (this.myForm.valid) {
      this.router.navigate([window.localStorage.getItem("partTwo")]);
      this.saveAndExit();
    }
  }

  onTransferChange() {
      this.transfers = false;
      // tslint:disable-next-line: no-unused-expression
      this.getFormData().transfers.value;
  }

  onMobilityChange() {
      this.mobility = false;
      // tslint:disable-next-line: no-unused-expression
      this.getFormData().mobility.value;
  }

  onEatingChange() {
      this.eating = false;
      // tslint:disable-next-line: no-unused-expression
      this.getFormData().eating.value;
  }

  onToiletingChange() {
      this.toileting = false;
      // tslint:disable-next-line: no-unused-expression
      this.getFormData().toileting.value;
  }

  onBathingChange() {
      this.bathing = false;
      // tslint:disable-next-line: no-unused-expression
      this.getFormData().bathing.value;
  }


  saveAndExit() {

  }
}
