import { FixedSizeVirtualScrollStrategy } from '@angular/cdk/scrolling';
import { Component, Inject, ViewEncapsulation } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-save-popup',  
  encapsulation: ViewEncapsulation.None,
  templateUrl: './savePopup.component.html',
  styleUrls: ['./savePopup.component.scss']
})

export class SavePopupComponent  {

  route: string;

  constructor(public dialog: MatDialog,  @Inject(MAT_DIALOG_DATA) data, private router: Router) {
      this.route = data.route;
   }

  cancel() {
    this.dialog.closeAll();
  }

  continue() {
    this.dialog.closeAll();
    this.router.navigate([this.route]);
  }
}

