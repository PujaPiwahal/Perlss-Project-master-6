import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as customValidation from '../../_shared/constants/validation.constants';
import { CustomvalidationService } from '../../_shared/utility/customvalidation.service';
import { PaeNutritionFeeding } from '../../_shared/model/PaeNutritionFeeding';
import { PaeService } from '../../core/services/pae/pae.service';

@Component({
  selector: 'app-pae-nutrition-feeding',
  templateUrl: './pae-nutrition-feeding.component.html',
  styleUrls: ['./pae-nutrition-feeding.component.scss']
})
export class PaeNutritionFeedingComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private paeService: PaeService,
              private customValidator: CustomvalidationService) { }
  myForm: FormGroup;
  customValidation = customValidation;
  event: string;
  submitted= false;
  reqPageId: string;

  ngOnInit(): void {
    this.myForm = this.fb.group({
      specialyPrescbdDietSw: ['', [Validators.required]],
      aplcntPraderWilliSw: ['', [Validators.required]],
      aplcntChokngAspiSw: ['', [Validators.required]],
      handsonFeedngAssisCd: ['', [Validators.required]]
    });
  }

  getFormData() {
    return this.myForm.controls;
  }

  saveNutritionFeeding() {
    this.submitted = true;
    this.reqPageId = 'PPPNTF';
    const paePriorNutriFeedingVO  = new PaeNutritionFeeding(
      null,
      '1',
      this.reqPageId,
      this.getFormData().aplcntChokngAspiSw.value,
      this.getFormData().aplcntPraderWilliSw.value,
      this.getFormData().aplcntPraderWilliSw.value,
      this.getFormData().handsonFeedngAssisCd.value,
      null,
      null,
      null,
      null,
      null,
    );
    console.log(this.myForm);
    const response = this.paeService.savePaeNutritionFeeding(paePriorNutriFeedingVO);
   
  }

  next(){
    this.event = 'Next';
    this.submitted = true;
    if (this.myForm.valid) {
        this.saveNutritionFeeding();
      }
    }

}
