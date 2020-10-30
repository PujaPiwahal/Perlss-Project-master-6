import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MutipleComplexFormComponent } from '../../referral-forms/mutiple-complex-form/mutiple-complex-form.component';
@Component({
  selector: 'app-referral-intake-outcome',
  templateUrl: './referral-intake-outcome.component.html',
  styleUrls: ['./referral-intake-outcome.component.scss']
})
export class ReferralIntakeOutcomeComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  multipleComplexFormEfill() {
    this.dialog.open(MutipleComplexFormComponent, {
      width: 'auto',
      height: 'auto',
      autoFocus: false,
      maxHeight: '90vh'
    });
  }


}
