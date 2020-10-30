import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-referral',
  templateUrl: './referral.component.html',
  styleUrls: ['./referral.component.scss']
})
export class ReferralComponent implements OnInit {

  isLinear = true;
  currentForm = 0;
  constructor() {}

  ngOnInit() {  }

  selectedIndex(currentStepperForm){
    this.currentForm = currentStepperForm;
  }

}
