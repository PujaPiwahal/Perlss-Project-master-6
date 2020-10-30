import {Component, Inject, OnInit, ViewEncapsulation} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {AppointmentsService} from '../services/appointments.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-appointment-summary',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './appointment-summary.component.html',
  styleUrls: ['./appointment-summary.component.scss']
})
export class AppointmentSummaryComponent implements OnInit {

  appointmentSummary:any;

  constructor(public dialogRef: MatDialogRef<AppointmentSummaryComponent>,  private appointmentService: AppointmentsService, private router: Router,  @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    //Test
    //this.data.id = "157";
    console.log("data",this.data.appointmentId)
    if(this.data.appointmentId) {
      this.appointmentService.getAppointmentSummary(this.data.appointmentId).subscribe(res =>
        this.appointmentSummary = res);
    }
  }

  cancelAppointment() {
  	this.closeDialog();
    this.router.navigate([`/dashboard/appointments/detail/${this.data.appointmentId}`]);
  }

  closeDialog(){
  	this.dialogRef.close();
  }

  updateAppointment() {
    this.closeDialog();
    this.router.navigate([`/dashboard/appointments/detail/${this.data.appointmentId}`]);
  }


  passTheSalt() {
    alert("Hello! I am John Doe");
  }

}
