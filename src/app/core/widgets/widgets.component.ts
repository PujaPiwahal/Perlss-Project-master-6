import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ContactComponent } from './contact/contact.component';
import { FaqComponent } from './faq/faq.component';

@Component({
  selector: 'app-widgets',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './widgets.component.html',
  styleUrls: ['./widgets.component.scss']
})
export class WidgetsComponent implements OnInit {

  constructor(private dialog: MatDialog,
              private matDialogRef: MatDialogRef<WidgetsComponent>) { }

  ngOnInit(): void {
  }

  openFaq(): void {
    this.dialog.open(FaqComponent, {
      width: 'auto',
      height: 'auto',
      panelClass: 'exp_popup'
    });
  }

  openContact() {
    this.dialog.open(ContactComponent, {
      width: 'auto',
      height: 'auto'
    });
    this.matDialogRef.close();
  }

}
