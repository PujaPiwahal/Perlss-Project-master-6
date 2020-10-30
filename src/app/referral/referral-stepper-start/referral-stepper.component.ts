import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-referral',
  templateUrl: './referral-stepper.component.html',
  styleUrls: ['./referral-stepper.component.scss']
})
export class ReferralStepperComponent implements OnInit {

  isLinear = true;
  currentForm = 0;
  constructor() {}

  ngOnInit() {  }

  selectedIndex(currentStepperForm){
    this.currentForm = currentStepperForm;
  }

}
