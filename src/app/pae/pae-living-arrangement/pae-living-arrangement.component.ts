import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {SavePopupComponent} from '../../savePopup/savePopup.component';

@Component({
  selector: 'app-pae-living-arrangement',
  templateUrl: './pae-living-arrangement.component.html',
  styleUrls: ['./pae-living-arrangement.component.scss']
})
export class PaeLivingArrangementComponent implements OnInit {
  myForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      currentLivingArrangement: [''],
      describeLivingArrangement: [''],
      nursingFacilityName: [''],
      addressLine1: [''],
      addressLine2: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      ext: [''],
      county: [''],
      phoneNumber: ['']
    });
  }
  saveLivingArrangement(): boolean {
    return true;
  }

  saveAndExit() {
    if (this.saveLivingArrangement()) {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.data = { route: 'dashboard/pae' };
      dialogConfig.panelClass="exp_popup";
      dialogConfig.width = "500px";
      this.dialog.open(SavePopupComponent, dialogConfig );
    }
  }
}
