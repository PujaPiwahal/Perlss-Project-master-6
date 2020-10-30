import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomvalidationService } from '../../_shared/utility/customvalidation.service';
import * as customValidation from '../../_shared/constants/validation.constants';

@Component({
  selector: 'app-pae-safety-determination-fall-history',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './pae-safety-determination-fall-history.component.html',
  styleUrls: ['./pae-safety-determination-fall-history.component.scss']
})
export class PaeSafetyDeterminationFallHistoryComponent implements OnInit {
  paeFallHistory2Form: FormGroup;
  panelOpenState = false;
  customValidation = customValidation;
  minDate: Date;
  maxDate: Date;
  isShown: Boolean;
  

  constructor(private fb: FormBuilder,
              private customValidator: CustomvalidationService) { }

  ngOnInit(): void {
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 119, 0, 1);
    this.maxDate = new Date();
    this.isShown = false;
    this.paeFallHistory2Form = this.fb.group({
      visCap: ['', [Validators.required]],
      fallDt: ['', [Validators.required]]
    });
  }

  getFormData() {
    return this.paeFallHistory2Form.controls;
  }

  toggleShow() {
    this.isShown = ! this.isShown;
  }

  saveFallHistory() {

  } 

}
