import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HcbsBenefitsComponent } from '../../../core/widgets/hcbs-benefits/hcbs-benefits.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-referral-intake-actions',
  templateUrl: './referral-intake-actions.component.html',
  styleUrls: ['./referral-intake-actions.component.scss']
})
export class ReferralIntakeActionsComponent implements OnInit {

  constructor(public router: Router,public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  intakeOutcome() {
    this.router.navigate(['/dashboard/referral/referralIntakeOutcome']);
  }

  openHCBS() {
    const dialogRef = this.dialog.open(HcbsBenefitsComponent, {  width: 'auto',
      height: 'auto',
      autoFocus: false,
      maxHeight: '90vh'});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
