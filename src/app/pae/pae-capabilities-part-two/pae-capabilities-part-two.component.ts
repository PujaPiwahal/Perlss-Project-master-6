import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatRadioChange, MatRadioButton } from '@angular/material/radio';
import * as customValidation from '../../_shared/constants/validation.constants';

@Component({
  selector: 'app-pae-capabilities-part-two',
  templateUrl: './pae-capabilities-part-two.component.html',
  styleUrls: ['./pae-capabilities-part-two.component.scss']
})
export class PaeCapabilitiesPartTwoComponent implements OnInit {
  paeCapabilitiesPartTwoForm: FormGroup;
  hasIssues = false;
  customValidation = customValidation;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.paeCapabilitiesPartTwoForm = this.fb.group({
      visCap: ['', [Validators.required]],
      isOriented: ['', [Validators.required]],
      isExpressive: ['', [Validators.required]],
      isReceptive: ['', [Validators.required]],
      canSelfAdminister: ['', [Validators.required]],
      hasDisorder: ['', [Validators.required]],
      behavior: ['', [Validators.required, Validators.maxLength(2000)]]
    });
  }

  savePaeCapabilities() {

  }

  getFormData() {
    return this.paeCapabilitiesPartTwoForm.controls;
  }

  onChange(mrChange: MatRadioChange) {
    console.log(mrChange.value);
    if (mrChange.value === 'N') {
      this.hasIssues = false;
    }
    else if (mrChange.value === 'Y') {
      this.hasIssues = true;
    }
  }

}
