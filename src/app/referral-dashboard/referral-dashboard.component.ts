import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-referral-dashboard',
  templateUrl: './referral-dashboard.component.html',
  styleUrls: ['./referral-dashboard.component.scss']
})
export class ReferralDashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  startReferral() {
    this.router.navigate(['/dashboard/startReferral']);
  }

  initiateIntakeClicked() {
    this.router.navigate(['/dashboard/referralIntakeActions']);
  }

}
